-- Verify maevsi:type_jwt on pg

BEGIN;

SELECT pg_catalog.has_type_privilege('maevsi.jwt', 'usage');

ROLLBACK;
