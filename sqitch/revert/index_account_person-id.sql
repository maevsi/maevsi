-- Revert maevsi:index_account_person-id from pg

BEGIN;

DROP INDEX maevsi_private."idx_account_person-id";

COMMIT;
