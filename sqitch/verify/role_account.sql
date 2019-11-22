-- Verify maevsi:role_account on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.pg_has_role('maevsi_postgraphile', 'maevsi_account', 'USAGE'));
END $$;

ROLLBACK;
