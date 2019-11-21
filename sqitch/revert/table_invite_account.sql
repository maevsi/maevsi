-- Revert maevsi:table_invite_account from pg

BEGIN;

DROP TABLE maevsi.invite_account;

COMMIT;
