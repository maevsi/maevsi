-- Verify maevsi:function_event_delete on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.event_delete(BIGINT, TEXT)', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.event_delete(BIGINT, TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
