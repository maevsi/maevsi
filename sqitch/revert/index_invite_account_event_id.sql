-- Revert maevsi:index_invite_account_event_id from pg

BEGIN;

DROP INDEX maevsi.idx_invite_account_event_id;

COMMIT;
