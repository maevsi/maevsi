-- Verify maevsi:function_account_is_existing on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.account_is_existing(TEXT)', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.account_is_existing(TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
