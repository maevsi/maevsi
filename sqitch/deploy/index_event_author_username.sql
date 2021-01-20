-- Deploy maevsi:index_event_author_username to pg
-- requires: table_event

BEGIN;

CREATE INDEX idx_event_author_username ON maevsi.event (author_username);

COMMENT ON INDEX maevsi.idx_event_author_username IS 'Speeds up reverse foreign key lookups.';

COMMIT;
