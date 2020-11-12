-- Revert maevsi:index_event_grouping_event_id from pg

BEGIN;

DROP INDEX maevsi."idx_event_grouping_event_id";

COMMIT;
