-- Revert maevsi:extension_uuid-ossp from pg

BEGIN;

DROP EXTENSION "uuid-ossp";

COMMIT;
