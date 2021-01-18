-- Deploy maevsi:index_invitation_event_id to pg
-- requires: table_invitation

BEGIN;

CREATE INDEX idx_invitation_event_id ON maevsi.invitation (event_id);

COMMENT ON INDEX maevsi.idx_invitation_event_id IS 'Speeds up reverse foreign key lookups.';

COMMIT;
