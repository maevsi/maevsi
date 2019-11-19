-- Verify maevsi:schema_public on pg

BEGIN;

SELECT pg_catalog.has_schema_privilege('maevsi', 'usage');

ROLLBACK;
