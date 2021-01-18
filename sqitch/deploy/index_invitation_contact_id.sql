-- Deploy maevsi:index_invitation_contact_id to pg
-- requires: table_invitation

BEGIN;

CREATE INDEX idx_invitation_contact_id ON maevsi.invitation (contact_id);

COMMENT ON INDEX maevsi.idx_invitation_contact_id IS 'Speeds up reverse foreign key lookups.';

COMMIT;
