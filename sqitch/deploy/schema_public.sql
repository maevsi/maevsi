-- Deploy maevsi:schema_public to pg

BEGIN;

CREATE SCHEMA maevsi;

COMMENT ON SCHEMA "maevsi" IS 'Is used by PostGraphile.';

COMMIT;
