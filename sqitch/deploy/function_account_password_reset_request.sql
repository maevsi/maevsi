-- Deploy maevsi:function_account_password_reset_request to pg
-- requires: extension_uuid-ossp
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: schema_private
-- requires: role_anonymous
-- requires: table_account
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.account_password_reset_request(email_address TEXT)
RETURNS VOID AS $$
DECLARE
  _notify_data RECORD;
BEGIN
  IF ((SELECT account.email_address_verification FROM maevsi_private.account WHERE account.email_address = $1) IS NOT NULL) THEN
    RAISE 'Account not verified!' USING ERRCODE = 'object_not_in_prerequisite_state';
  END IF;

  WITH updated AS (
    UPDATE maevsi_private.account
      SET password_reset_verification = maevsi.uuid_generate_v1mc()
      WHERE account.email_address = $1
      RETURNING *
  ) SELECT updated.username, updated.email_address, updated.password_reset_verification
    FROM updated
    INTO _notify_data;

  IF (_notify_data IS NULL) THEN
    RAISE 'Nothing changed!' USING ERRCODE = 'no_data_found';
  ELSE
    PERFORM pg_notify('account_password_reset_request', jsonb_pretty(jsonb_build_object('account', _notify_data)));
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_password_reset_request(TEXT) IS 'Sets a new password reset verification code for an account.';

GRANT EXECUTE ON FUNCTION maevsi.account_password_reset_request(TEXT) TO maevsi_anonymous;

COMMIT;
