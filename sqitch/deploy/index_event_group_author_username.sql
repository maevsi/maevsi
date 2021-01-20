-- Deploy maevsi:index_event_group_author_username to pg
-- requires: table_event_group

BEGIN;

CREATE INDEX idx_event_group_author_username ON maevsi.event_group (author_username);

COMMENT ON INDEX maevsi.idx_event_group_author_username IS 'Speeds up reverse foreign key lookups.';

COMMIT;
