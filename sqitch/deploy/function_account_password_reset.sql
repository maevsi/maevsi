-- Deploy maevsi:function_account_password_reset to pg
-- requires: extension_uuid-ossp
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: schema_private
-- requires: role_anonymous
-- requires: table_account
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.account_password_reset(
  code UUID,
  "password" TEXT
) RETURNS VOID AS $$
DECLARE
  _account maevsi_private.account;
BEGIN
  IF (char_length($2) < 8) THEN
    RAISE 'Password too short!' USING ERRCODE = 'invalid_parameter_value';
  END IF;

  SELECT *
    FROM maevsi_private.account
    INTO _account
    WHERE account.password_reset_verification = $1;

  IF (_account IS NULL) THEN
    RAISE 'Unknown reset code!' USING ERRCODE = 'no_data_found';
  END IF;

  IF (_account.password_reset_verification_valid_until < NOW()) THEN
    RAISE 'Reset code expired!' USING ERRCODE = 'object_not_in_prerequisite_state';
  END IF;

  UPDATE maevsi_private.account
    SET
      password_hash = maevsi.crypt($2, maevsi.gen_salt('bf')),
      password_reset_verification = NULL
    WHERE account.password_reset_verification = $1;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_password_reset(UUID, TEXT) IS 'Sets a new password for an account if there was a request to do so before that''s still up to date.';

GRANT EXECUTE ON FUNCTION maevsi.account_password_reset(UUID, TEXT) TO maevsi_anonymous;

COMMIT;
