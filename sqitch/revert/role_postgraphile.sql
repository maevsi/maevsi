-- Revert maevsi:role_postgraphile from pg

BEGIN;

DROP OWNED BY maevsi_postgraphile;
DROP ROLE maevsi_postgraphile;

COMMIT;
