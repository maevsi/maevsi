-- Revert maevsi:index_invite-account_account-id from pg

BEGIN;

DROP INDEX maevsi."idx_invite-account_account-id";

COMMIT;
