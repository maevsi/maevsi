-- Verify maevsi:role_tusd on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.pg_has_role('maevsi_tusd', 'USAGE'));
  -- Other accounts might not exist yet for a NOT-check.
END $$;

ROLLBACK;
