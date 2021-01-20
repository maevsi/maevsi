-- Deploy maevsi:role_stomper to pg
-- requires: role_postgraphile

BEGIN;

\set role_maevsi_stomper_password `cat /run/secrets/postgres_role_maevsi-stomper_password`
CREATE ROLE maevsi_stomper LOGIN PASSWORD :'role_maevsi_stomper_password';

GRANT maevsi_stomper to maevsi_postgraphile;

COMMIT;
