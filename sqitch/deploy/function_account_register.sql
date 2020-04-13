-- Deploy maevsi:function_account_register to pg
-- requires: privilege_execute_revoke
-- requires: schema_private
-- requires: schema_public
-- requires: role_anonymous
-- requires: table_contact
-- requires: table_account
-- requires: type_jwt
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.account_register(
    "username" TEXT,
    "email_address" TEXT,
    "password" TEXT
) RETURNS maevsi.jwt AS $$
DECLARE
    "_contact" maevsi.contact;
    "_new_account_notify" RECORD;
BEGIN
    IF char_length("password") < 8
    THEN
        RAISE 'Password too short!' USING ERRCODE = 'invalid_parameter_value';
    END IF;

    IF EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = $1)
    THEN
        RAISE 'An account with this username already exists!' USING ERRCODE = 'unique_violation';
    END IF;

    IF EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.email_address = $2)
    THEN
        RAISE 'An account with this email address already exists!' USING ERRCODE = 'unique_violation';
    END IF;

    INSERT INTO maevsi.contact DEFAULT VALUES
        RETURNING * INTO "_contact";

    INSERT INTO maevsi_private.account("contact_id", "username", "email_address", "password_hash", "last_activity") VALUES
        ("_contact".id, "username", "email_address", maevsi.crypt("password", maevsi.gen_salt('bf')), NOW())
        RETURNING account.username, account.email_address, "email_address_verification"
        INTO "_new_account_notify";

    PERFORM pg_notify('account_register', jsonb_pretty(jsonb_build_object('account', row_to_json("_new_account_notify"))));

    RETURN (SELECT maevsi.authenticate("username", "password"));
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_register(TEXT, TEXT, TEXT) IS 'Creates a contact and registers an account referencing it.';

GRANT EXECUTE ON FUNCTION maevsi.account_register(TEXT, TEXT, TEXT) TO maevsi_anonymous;

COMMIT;
