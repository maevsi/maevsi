-- Deploy maevsi:role_tusd to pg
-- requires: role_postgraphile

BEGIN;

\set role_maevsi_tusd_password `cat /run/secrets/postgres_role_maevsi-tusd_password`
CREATE ROLE maevsi_tusd LOGIN PASSWORD :'role_maevsi_tusd_password';

GRANT maevsi_tusd to maevsi_postgraphile;

COMMIT;
