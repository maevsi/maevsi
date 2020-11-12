-- Deploy maevsi:index_invite_contact_event_id to pg
-- requires: table_invite_contact

BEGIN;

CREATE INDEX idx_invite_contact_event_id ON maevsi.invite_contact (event_id);

COMMENT ON INDEX maevsi.idx_invite_contact_event_id IS 'Speeds up reverse foreign key lookups.';

COMMIT;
