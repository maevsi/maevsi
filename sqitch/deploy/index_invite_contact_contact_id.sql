-- Deploy maevsi:index_invite_contact_contact_id to pg
-- requires: table_invite_contact

BEGIN;

CREATE INDEX "idx_invite_contact_contact_id" ON maevsi.invite_contact ("contact_id");

COMMENT ON INDEX maevsi."idx_invite_contact_contact_id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
