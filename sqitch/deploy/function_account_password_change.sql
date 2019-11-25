-- Deploy maevsi:function_account_password_change to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: table_account
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.account_password_change(current_password TEXT, new_password TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  _account_current_id maevsi_private.account;
BEGIN
  _account_current_id := current_setting('jwt.claims.account_id', true)::integer;
  IF EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.contact_id = _account_current_id AND account.password_hash = maevsi.crypt($1, account.password_hash))
  THEN
    UPDATE maevsi_private.account SET password_hash = maevsi.crypt($2, maevsi.gen_salt('bf')) WHERE account.contact_id = _account_current_id;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION maevsi.account_password_change(TEXT, TEXT) TO maevsi_account;

COMMIT;
