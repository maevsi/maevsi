-- Verify maevsi:function_account_delete on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.account_delete(TEXT)', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.account_delete(TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
