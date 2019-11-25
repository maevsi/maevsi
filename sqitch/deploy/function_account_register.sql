-- Deploy maevsi:function_account_register to pg
-- requires: privilege_execute_revoke
-- requires: schema_private
-- requires: role_anonymous
-- requires: table_contact
-- requires: table_account
-- requires: type_jwt
-- requires: extension_pgcrypto

BEGIN;

-- TODO: move to maevsi (public)
CREATE FUNCTION maevsi_private.account_register(
    "username" TEXT,
    "e-mail_address" TEXT,
    "password" TEXT
) RETURNS maevsi.jwt AS $$
DECLARE
    _contact maevsi.contact;
BEGIN
    INSERT INTO maevsi.contact DEFAULT VALUES
        RETURNING * INTO _contact;

    INSERT INTO maevsi_private.account("contact_id", "username", "e-mail_address", "password_hash", "last_activity") VALUES
        (_contact.id, "username", "e-mail_address", maevsi.crypt("password", maevsi.gen_salt('bf')), NOW());

    RETURN (SELECT maevsi.authenticate("e-mail_address", "password"));
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.account_register(TEXT, TEXT, TEXT) IS 'Creates a contact and registers an account referencing it.';

GRANT EXECUTE ON FUNCTION maevsi_private.account_register(TEXT, TEXT, TEXT) TO maevsi_anonymous;

COMMIT;
