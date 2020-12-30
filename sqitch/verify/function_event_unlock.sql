-- Verify maevsi:function_event_unlock on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.event_unlock(UUID)', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.event_unlock(UUID)', 'EXECUTE'));
END $$;

ROLLBACK;
