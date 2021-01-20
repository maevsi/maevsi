-- Revert maevsi:index_event_author_username from pg

BEGIN;

DROP INDEX maevsi.idx_event_author_username;

COMMIT;
