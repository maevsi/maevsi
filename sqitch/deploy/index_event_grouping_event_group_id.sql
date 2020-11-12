-- Deploy maevsi:index_event_grouping_event_group_id to pg
-- requires: table_event_grouping

BEGIN;

CREATE INDEX idx_event_grouping_event_group_id ON maevsi.event_grouping (event_group_id);

COMMENT ON INDEX maevsi.idx_event_grouping_event_group_id IS 'Speeds up reverse foreign key lookups.';

COMMIT;
