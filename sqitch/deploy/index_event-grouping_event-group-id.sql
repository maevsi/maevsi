-- Deploy maevsi:index_event-grouping_event-group-id to pg
-- requires: table_event_grouping

BEGIN;

CREATE INDEX "idx_event-grouping_event-group-id" ON maevsi.event_grouping ("event_group_id");

COMMENT ON INDEX maevsi."idx_event-grouping_event-group-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
