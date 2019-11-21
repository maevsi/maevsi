-- Revert maevsi:index_invite-account_event-id from pg

BEGIN;

DROP INDEX maevsi."idx_invite-account_event-id";

COMMIT;
