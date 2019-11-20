-- Deploy maevsi:schema_private to pg

BEGIN;

CREATE SCHEMA maevsi_private;

COMMENT ON SCHEMA "maevsi_private" IS 'Contains account information and is not used by PostGraphile.';

COMMIT;
