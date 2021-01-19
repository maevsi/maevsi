-- Deploy maevsi:function_account_delete to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: table_account
-- requires: table_event
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.account_delete(
  "password" TEXT
) RETURNS VOID AS $$
DECLARE
  _current_username TEXT;
BEGIN
  _current_username := current_setting('jwt.claims.username', true)::TEXT;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = _current_username AND account.password_hash = maevsi.crypt($1, account.password_hash))) THEN
    IF (EXISTS (SELECT 1 FROM maevsi.event WHERE event.organizer_username = _current_username)) THEN
      RAISE 'You still own events!' USING ERRCODE = 'foreign_key_violation';
    ELSE
      DELETE FROM maevsi_private.account WHERE account.username = _current_username;
    END IF;
  ELSE
    RAISE 'Account with given password not found!' USING ERRCODE = 'no_data_found';
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_delete(TEXT) IS 'Allows to delete an account.';

GRANT EXECUTE ON FUNCTION maevsi.account_delete(TEXT) TO maevsi_account;

COMMIT;
