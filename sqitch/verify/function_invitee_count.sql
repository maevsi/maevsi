-- Verify maevsi:function_invitee_count on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.invitee_count(BIGINT)', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.invitee_count(BIGINT)', 'EXECUTE'));
END $$;

ROLLBACK;
