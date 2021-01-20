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
  _notify_email_address TEXT;
BEGIN
  WITH updated AS (
    UPDATE maevsi_private.account
      SET email_address_verification = NULL
      WHERE
        email_address_verification = $1
        AND
        email_address_verification_valid_until >= NOW()
      RETURNING email_address
  ) SELECT email_address
    FROM updated
    INTO _notify_email_address;

  IF (_notify_email_address IS NULL) THEN
    RAISE 'Nothing changed!' USING ERRCODE = 'no_data_found';
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_email_address_verification(UUID) IS 'Sets the account''s email address verification code to `NULL` for which the email address verification code equals the one passed and is up to date.';

GRANT EXECUTE ON FUNCTION maevsi.account_email_address_verification(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
