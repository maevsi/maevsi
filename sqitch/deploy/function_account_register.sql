-- Deploy maevsi:function_account_register to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_anonymous
-- requires: table_contact
-- requires: table_account
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.account_register(
    "username" TEXT,
    "e-mail_address" TEXT,
    "password" TEXT
) RETURNS maevsi.contact AS $$
DECLARE
  contact maevsi.contact;
BEGIN
    INSERT INTO maevsi.contact DEFAULT VALUES
        RETURNING * INTO contact;

    INSERT INTO maevsi_private.account("contact_id", "username", "e-mail_address", "password_hash", "last_activity") values
        (contact.id, "username", "e-mail_address", maevsi.crypt("password", maevsi.gen_salt('bf')), now());

    RETURN contact;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_register(TEXT, TEXT, TEXT) IS 'Creates a contact and registers an account referencing it.';

GRANT EXECUTE ON FUNCTION maevsi.account_register(TEXT, TEXT, TEXT) TO maevsi_anonymous;

COMMIT;
