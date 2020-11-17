-- Verify maevsi:function_account_password_change on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.account_password_change(TEXT, TEXT)', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.account_password_change(TEXT, TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
