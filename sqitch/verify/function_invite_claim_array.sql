-- Verify maevsi:function_invite_claim_array on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.invite_claim_array()', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.invite_claim_array()', 'EXECUTE'));
END $$;

ROLLBACK;
