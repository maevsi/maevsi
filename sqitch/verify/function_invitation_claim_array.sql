-- Verify maevsi:function_invitation_claim_array on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.invitation_claim_array()', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.invitation_claim_array()', 'EXECUTE'));
END $$;

ROLLBACK;
