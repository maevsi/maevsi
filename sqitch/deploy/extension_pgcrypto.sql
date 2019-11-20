-- Deploy maevsi:extension_pgcrypto to pg

BEGIN;

CREATE EXTENSION "pgcrypto";

COMMENT ON EXTENSION "pgcrypto" IS 'Provides password hashing functions.';

COMMIT;
