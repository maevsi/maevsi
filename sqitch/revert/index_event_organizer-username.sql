-- Revert maevsi:index_event_organizer-username from pg

BEGIN;

DROP INDEX maevsi."idx_event_organizer-username";

COMMIT;
