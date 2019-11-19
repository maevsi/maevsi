-- Revert maevsi:schema_public from pg

BEGIN;

DROP SCHEMA maevsi;

COMMIT;
