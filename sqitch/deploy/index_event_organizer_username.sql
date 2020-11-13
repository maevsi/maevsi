-- Deploy maevsi:index_event_organizer_username to pg
-- requires: table_event

BEGIN;

CREATE INDEX idx_event_organizer_username ON maevsi.event (organizer_username);

COMMENT ON INDEX maevsi.idx_event_organizer_username IS 'Speeds up reverse foreign key lookups.';

COMMIT;
