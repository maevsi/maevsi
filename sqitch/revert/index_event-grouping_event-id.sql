-- Revert maevsi:index_event-grouping_event-id from pg

BEGIN;

DROP INDEX maevsi."idx_event-grouping_event-id";

COMMIT;
