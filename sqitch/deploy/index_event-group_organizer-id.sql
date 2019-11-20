-- Deploy maevsi:index_event-group_organizer-id to pg
-- requires: table_event_group

BEGIN;

CREATE INDEX "idx_event-group_organizer-id" ON maevsi.event_group ("organizer_id");

COMMENT ON INDEX maevsi."idx_event-group_organizer-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
