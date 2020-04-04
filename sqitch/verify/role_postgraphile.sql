-- Verify maevsi:role_postgraphile on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.pg_has_role('maevsi_postgraphile', 'USAGE'));
   -- Other accounts might not exist yet for a NOT-check.
END $$;

ROLLBACK;
