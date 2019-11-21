-- Revert maevsi:index_invite-contact_event-id from pg

BEGIN;

DROP INDEX maevsi."idx_invite-contact_event-id";

COMMIT;
