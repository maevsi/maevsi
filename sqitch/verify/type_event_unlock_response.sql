-- Verify maevsi:type_event_unlock_response on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_type_privilege('maevsi.event_unlock_response', 'USAGE'));
END $$;

ROLLBACK;
