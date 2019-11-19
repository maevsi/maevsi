-- Deploy maevsi:extension_uuid-ossp to pg

BEGIN;

CREATE EXTENSION "uuid-ossp";

COMMIT;
