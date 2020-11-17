-- Verify maevsi:function_account_email_address_verification on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.account_email_address_verification(UUID)', 'EXECUTE'));
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.account_email_address_verification(UUID)', 'EXECUTE'));
END $$;

ROLLBACK;
