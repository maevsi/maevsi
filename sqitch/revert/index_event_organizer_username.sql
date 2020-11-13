-- Revert maevsi:index_event_organizer_username from pg

BEGIN;

DROP INDEX maevsi.idx_event_organizer_username;

COMMIT;
