-- Deploy maevsi:function_account_is_existing to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: schema_private
-- requires: table_account
-- requires: role_account
-- requires: role_anonymous

BEGIN;

CREATE FUNCTION maevsi.account_is_existing(
  username TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = $1)) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_is_existing(TEXT) IS 'Shows if an account exists.';

GRANT EXECUTE ON FUNCTION maevsi.account_is_existing(TEXT) TO maevsi_account, maevsi_anonymous;

COMMIT;
