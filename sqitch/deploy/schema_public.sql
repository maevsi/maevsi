-- Deploy maevsi:schema_public to pg
-- requires: role_anonymous
-- requires: role_account
-- requires: role_tusd

BEGIN;

CREATE SCHEMA maevsi;

COMMENT ON SCHEMA "maevsi" IS 'Is used by PostGraphile.';

GRANT USAGE ON SCHEMA maevsi TO maevsi_anonymous, maevsi_account, maevsi_tusd;

COMMIT;
