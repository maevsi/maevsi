-- Verify maevsi:function_authenticate on pg

BEGIN;

DO $$
BEGIN
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.authenticate(TEXT, TEXT)', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.authenticate(TEXT, TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
