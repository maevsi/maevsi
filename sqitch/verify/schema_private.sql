-- Verify maevsi:schema_private on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('maevsi_private', 'usage');

ROLLBACK;
