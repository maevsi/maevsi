-- Revert maevsi:index_event_group_author_username from pg

BEGIN;

DROP INDEX maevsi.idx_event_group_author_username;

COMMIT;
