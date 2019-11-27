-- Verify maevsi:function_redeem on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.redeem(UUID)', 'EXECUTE'));
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.redeem(UUID)', 'EXECUTE'));
END $$;

ROLLBACK;
