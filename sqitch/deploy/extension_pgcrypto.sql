-- Deploy maevsi:extension_pgcrypto to pg

BEGIN;

CREATE EXTENSION "pgcrypto";

COMMIT;
