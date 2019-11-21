-- Verify maevsi:role_account on pg

BEGIN;

SELECT pg_catalog.pg_has_role('maevsi_account', 'usage');

ROLLBACK;
