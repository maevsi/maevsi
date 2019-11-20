-- Deploy maevsi:extension_uuid-ossp to pg

BEGIN;

CREATE EXTENSION "uuid-ossp";

COMMENT ON EXTENSION "uuid-ossp" IS 'Provides functions to generate universally unique ID.';

COMMIT;
