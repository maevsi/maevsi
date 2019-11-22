-- Deploy maevsi:role_anonymous to pg
-- requires: role_postgraphile

BEGIN;

CREATE ROLE maevsi_anonymous;

GRANT maevsi_anonymous to maevsi_postgraphile;

COMMIT;
