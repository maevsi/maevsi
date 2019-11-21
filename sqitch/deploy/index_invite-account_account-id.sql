-- Deploy maevsi:index_invite-account_account-id to pg
-- requires: table_invite_account

BEGIN;

CREATE INDEX "idx_invite-account_account-id" ON maevsi.invite_account ("account_id");

COMMENT ON INDEX maevsi."idx_invite-account_account-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
