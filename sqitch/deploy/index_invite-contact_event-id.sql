-- Deploy maevsi:index_invite-contact_event-id to pg
-- requires: table_invite_contact

BEGIN;

CREATE INDEX "idx_invite-contact_event-id" ON maevsi.invite_contact ("event_id");

COMMENT ON INDEX maevsi."idx_invite-contact_event-id" IS 'Speeds up reverse foreign key lookups.';

COMMIT;
