-- Deploy maevsi:index_invite_account_event_id to pg
-- requires: table_invite_account

BEGIN;

CREATE INDEX "idx_invite_account_event_id" ON maevsi.invite_account ("event_id");

COMMENT ON INDEX maevsi."idx_invite_account_event_id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
