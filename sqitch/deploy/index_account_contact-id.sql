-- Deploy maevsi:index_account_contact-id to pg
-- requires: table_account

BEGIN;

CREATE INDEX "idx_account_contact-id" ON maevsi_private.account ("contact_id");

COMMENT ON INDEX maevsi_private."idx_account_contact-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
