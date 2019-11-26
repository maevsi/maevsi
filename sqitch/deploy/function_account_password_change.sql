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
  _current_username TEXT;
BEGIN
  _current_username := current_setting('jwt.claims.username', true)::TEXT;
  IF EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = _current_username AND account.password_hash = maevsi.crypt($1, account.password_hash))
  THEN
    UPDATE maevsi_private.account SET password_hash = maevsi.crypt($2, maevsi.gen_salt('bf')) WHERE account.username = _current_username;
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION maevsi.account_password_change(TEXT, TEXT) TO maevsi_account;

COMMIT;
