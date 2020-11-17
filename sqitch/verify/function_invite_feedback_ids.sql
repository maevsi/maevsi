-- Verify maevsi:function_invite_feedback_ids on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi_private.invite_feedback_ids()', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi_private.invite_feedback_ids()', 'EXECUTE'));
END $$;

ROLLBACK;
