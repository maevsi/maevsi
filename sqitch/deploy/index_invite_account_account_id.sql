-- Deploy maevsi:index_invite_account_account_id to pg
-- requires: table_invite_account

BEGIN;

CREATE INDEX idx_invite_account_account_id ON maevsi.invite_account (account_id);

COMMENT ON INDEX maevsi.idx_invite_account_account_id IS 'Speeds up reverse foreign key lookups.';

COMMIT;
