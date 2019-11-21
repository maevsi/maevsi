-- Revert maevsi:role_postgraphile from pg

BEGIN;

DROP ROLE maevsi_postgraphile;

COMMIT;
