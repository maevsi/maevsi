-- Deploy maevsi:function_account_email_address_verification to pg
-- requires: extension_uuid-ossp
-- requires: privilege_execute_revoke
-- requires: schema_private
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: table_account

BEGIN;

CREATE FUNCTION maevsi.account_email_address_verification(
  code UUID
) RETURNS VOID AS $$
DECLARE
  _account maevsi_private.account;
BEGIN
  SELECT *
    FROM maevsi_private.account
    INTO _account
    WHERE account.email_address_verification = $1;

  IF (_account IS NULL) THEN
    RAISE 'Unknown verification code!' USING ERRCODE = 'no_data_found';
  END IF;

  IF (_account.email_address_verification_valid_until < NOW()) THEN
    RAISE 'Verification code expired!' USING ERRCODE = 'no_data_found';
  END IF;

  UPDATE maevsi_private.account
    SET email_address_verification = NULL
    WHERE email_address_verification = $1;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_email_address_verification(UUID) IS 'Sets the account''s email address verification code to `NULL` for which the email address verification code equals the one passed and is up to date.';

GRANT EXECUTE ON FUNCTION maevsi.account_email_address_verification(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
