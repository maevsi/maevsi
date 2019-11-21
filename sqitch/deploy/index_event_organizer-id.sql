-- Deploy maevsi:index_event_organizer-id to pg
-- requires: table_event

BEGIN;

CREATE INDEX "idx_event_organizer-id" ON maevsi.event ("organizer_id");

COMMENT ON INDEX maevsi."idx_event_organizer-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
