-- Verify maevsi:type_redeem_response on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_type_privilege('maevsi.redeem_response', 'USAGE'));
END $$;

ROLLBACK;
