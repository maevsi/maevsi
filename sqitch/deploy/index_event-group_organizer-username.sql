-- Deploy maevsi:index_event-group_organizer-username to pg
-- requires: table_event_group

BEGIN;

CREATE INDEX "idx_event-group_organizer-username" ON maevsi.event_group ("organizer_username");

COMMENT ON INDEX maevsi."idx_event-group_organizer-username" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
