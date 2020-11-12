-- Revert maevsi:index_event_grouping_event_group_id from pg

BEGIN;

DROP INDEX maevsi.idx_event_grouping_event_group_id;

COMMIT;
