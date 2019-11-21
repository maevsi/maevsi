-- Revert maevsi:index_event_organizer-id from pg

BEGIN;

DROP INDEX maevsi."idx_event_organizer-id";

COMMIT;
