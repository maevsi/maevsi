-- Verify maevsi:role_account on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.pg_has_role('maevsi_postgraphile', 'maevsi_account', 'USAGE'));
  -- Other accounts might not exist yet for a NOT-check.
END $$;

ROLLBACK;
