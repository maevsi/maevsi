-- Verify maevsi:role_anonymous on pg

BEGIN;

SELECT pg_catalog.pg_has_role('maevsi_anonymous', 'usage');

ROLLBACK;
