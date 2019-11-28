-- Revert maevsi:type_event_contact_feedback from pg

BEGIN;

DROP TYPE maevsi.event_contact_feedback;

COMMIT;
