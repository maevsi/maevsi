-- Verify maevsi:schema_public on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_schema_privilege('maevsi_account', 'maevsi', 'USAGE'));
  ASSERT (SELECT pg_catalog.has_schema_privilege('maevsi_anonymous', 'maevsi', 'USAGE'));
END $$;

ROLLBACK;
