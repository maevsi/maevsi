-- Revert maevsi:table_jwt from pg

BEGIN;

DROP TABLE maevsi_private.jwt;

COMMIT;
