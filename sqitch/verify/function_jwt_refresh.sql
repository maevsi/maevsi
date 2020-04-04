-- Verify maevsi:function_jwt_refresh on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.jwt_refresh(UUID)', 'EXECUTE'));
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.jwt_refresh(UUID)', 'EXECUTE'));
END $$;

ROLLBACK;
