-- Deploy maevsi:extension_uuid-ossp to pg
-- requires: schema_public
-- requires: role_account

BEGIN;

CREATE EXTENSION "uuid-ossp" WITH SCHEMA maevsi;

COMMENT ON EXTENSION "uuid-ossp" IS 'Provides functions to generate universally unique ID.';

GRANT EXECUTE ON FUNCTION maevsi.uuid_generate_v4() TO maevsi_account;

COMMIT;
