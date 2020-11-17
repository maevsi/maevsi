-- Verify maevsi:schema_private on pg

BEGIN;

DO $$
BEGIN
  ASSERT NOT (SELECT pg_catalog.has_schema_privilege('maevsi_account', 'maevsi_private', 'USAGE'));
  ASSERT NOT (SELECT pg_catalog.has_schema_privilege('maevsi_anonymous', 'maevsi_private', 'USAGE'));
END $$;

ROLLBACK;
