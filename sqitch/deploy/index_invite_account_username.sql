-- Deploy maevsi:index_invite_account_username to pg
-- requires: table_invite_account

BEGIN;

CREATE INDEX idx_invite_account_username ON maevsi.invite_account (username);

COMMENT ON INDEX maevsi.idx_invite_account_username IS 'Speeds up reverse foreign key lookups.';

COMMIT;
