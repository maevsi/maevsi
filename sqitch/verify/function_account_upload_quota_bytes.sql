-- Verify maevsi:function_account_upload_quota_bytes on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.account_upload_quota_bytes()', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.account_upload_quota_bytes()', 'EXECUTE'));
END $$;

ROLLBACK;
