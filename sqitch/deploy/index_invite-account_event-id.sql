-- Deploy maevsi:index_invite-account_event-id to pg
-- requires: table_invite_account

BEGIN;

CREATE INDEX "idx_invite-account_event-id" ON maevsi.invite_account ("event_id");

COMMENT ON INDEX maevsi."idx_invite-account_event-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
