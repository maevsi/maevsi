-- Revert maevsi:index_invite_account_username from pg

BEGIN;

DROP INDEX maevsi.idx_invite_account_username;

COMMIT;
