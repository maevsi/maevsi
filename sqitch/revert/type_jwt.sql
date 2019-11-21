-- Revert maevsi:type_jwt from pg

BEGIN;

DROP TYPE maevsi.jwt;

COMMIT;
