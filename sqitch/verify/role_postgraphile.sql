-- Verify maevsi:role_postgraphile on pg

BEGIN;

SELECT pg_catalog.pg_has_role('maevsi_postgraphile', 'usage');

ROLLBACK;
