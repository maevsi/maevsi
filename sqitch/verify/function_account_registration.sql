-- Verify maevsi:function_account_registration on pg

BEGIN;

DO $$
BEGIN
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.account_registration(TEXT, TEXT, TEXT, TEXT)', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.account_registration(TEXT, TEXT, TEXT, TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
