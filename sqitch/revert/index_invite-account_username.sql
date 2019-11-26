-- Revert maevsi:index_invite-account_username from pg

BEGIN;

DROP INDEX maevsi."idx_invite-account_username";

COMMIT;
