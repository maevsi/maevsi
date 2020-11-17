-- Verify maevsi:function_upload_create on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.upload_create(BIGINT)', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.upload_create(BIGINT)', 'EXECUTE'));
END $$;

ROLLBACK;
