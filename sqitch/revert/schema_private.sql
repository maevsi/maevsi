-- Revert maevsi:schema_private from pg

BEGIN;

DROP SCHEMA maevsi_private;

COMMIT;
