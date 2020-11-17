-- Verify maevsi:type_event_contact_feedback on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_type_privilege('maevsi.event_contact_feedback', 'USAGE'));
END $$;

ROLLBACK;
