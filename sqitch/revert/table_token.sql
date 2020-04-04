-- Revert maevsi:table_token from pg

BEGIN;

DROP TABLE maevsi_private.token;

COMMIT;
