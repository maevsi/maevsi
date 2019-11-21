-- Deploy maevsi:role_postgraphile to pg

BEGIN;

\set role_maevsi_postgraphile_password `cat /run/secrets/postgres_role_maevsi-postgraphile`
CREATE ROLE maevsi_postgraphile LOGIN PASSWORD :'role_maevsi_postgraphile_password';

COMMIT;
