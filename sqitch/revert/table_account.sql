-- Revert maevsi:table_account from pg

BEGIN;

DROP TABLE maevsi_private.account;

COMMIT;
