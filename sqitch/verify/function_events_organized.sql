-- Verify maevsi:function_invites on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.events_organized()', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.events_organized()', 'EXECUTE'));
END $$;

ROLLBACK;
