-- Revert maevsi:index_event-group_organizer-id from pg

BEGIN;

DROP INDEX maevsi."idx_event-group_organizer-id";

COMMIT;
