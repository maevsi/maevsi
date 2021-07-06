-- Deploy maevsi:function_account_upload_quota_bytes to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: schema_private
-- requires: table_account
-- requires: role_account

BEGIN;

CREATE FUNCTION maevsi.account_upload_quota_bytes() RETURNS BIGINT AS $$
BEGIN
  RETURN (SELECT upload_quota_bytes FROM maevsi_private.account WHERE account.username = current_setting('jwt.claims.username', true)::TEXT);
END;
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_upload_quota_bytes() IS 'Gets the total upload quota in bytes for the invoking account.';

GRANT EXECUTE ON FUNCTION maevsi.account_upload_quota_bytes() TO maevsi_account;

COMMIT;
