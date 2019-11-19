-- Revert maevsi:extension_pgcrypto from pg

BEGIN;

DROP EXTENSION "pgcrypto";

COMMIT;
