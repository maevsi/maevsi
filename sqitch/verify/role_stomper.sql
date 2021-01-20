-- Verify maevsi:role_stomper on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.pg_has_role('maevsi_stomper', 'USAGE'));
  -- Other accounts might not exist yet for a NOT-check.
END $$;

ROLLBACK;
