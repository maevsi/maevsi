-- Deploy maevsi:role_account to pg
-- requires: role_postgraphile

BEGIN;

CREATE ROLE maevsi_account;

GRANT maevsi_account to maevsi_postgraphile;

COMMIT;
