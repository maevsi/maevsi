-- Revert maevsi:index_event-group_organizer-username from pg

BEGIN;

DROP INDEX maevsi."idx_event-group_organizer-username";

COMMIT;
