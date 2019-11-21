-- Deploy maevsi:extension_uuid-ossp to pg
-- requires: schema

BEGIN;

CREATE EXTENSION "uuid-ossp" WITH SCHEMA maevsi;

COMMENT ON EXTENSION "uuid-ossp" IS 'Provides functions to generate universally unique ID.';

COMMIT;
