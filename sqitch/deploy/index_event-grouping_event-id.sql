-- Deploy maevsi:index_event-grouping_event-id to pg
-- requires: table_event_grouping

BEGIN;

CREATE INDEX "idx_event-grouping_event-id" ON maevsi.event_grouping ("event_id");

COMMENT ON INDEX maevsi."idx_event-grouping_event-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
