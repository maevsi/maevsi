-- Deploy maevsi:index_invite-contact_contact-id to pg
-- requires: table_invite_contact

BEGIN;

CREATE INDEX "idx_invite-contact_contact-id" ON maevsi.invite_contact ("contact_id");

COMMENT ON INDEX maevsi."idx_invite-contact_contact-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
