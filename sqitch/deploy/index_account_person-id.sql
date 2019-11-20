-- Deploy maevsi:index_account_person-id to pg
-- requires: table_account

BEGIN;

CREATE INDEX "idx_account_person-id" ON maevsi_private.account ("person_id");

COMMENT ON INDEX maevsi_private."idx_account_person-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
