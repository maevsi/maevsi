-- Verify maevsi:role_postgraphile on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.pg_has_role('maevsi_postgraphile', 'USAGE'));
END $$;

ROLLBACK;
