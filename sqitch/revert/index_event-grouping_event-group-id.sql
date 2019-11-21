-- Revert maevsi:index_event-grouping_event-group-id from pg

BEGIN;

DROP INDEX maevsi."idx_event-grouping_event-group-id";

COMMIT;
