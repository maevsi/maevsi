-- Revert maevsi:role_account from pg

BEGIN;

DROP ROLE maevsi_account;

COMMIT;
