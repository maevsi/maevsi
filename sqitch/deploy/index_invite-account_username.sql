-- Deploy maevsi:index_invite-account_username to pg
-- requires: table_invite_account

BEGIN;

CREATE INDEX "idx_invite-account_username" ON maevsi.invite_account ("username");

COMMENT ON INDEX maevsi."idx_invite-account_username" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
