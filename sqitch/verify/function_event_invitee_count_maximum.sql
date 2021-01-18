-- Verify maevsi:function_event_invitee_count_maximum on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.event_invitee_count_maximum(BIGINT)', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.event_invitee_count_maximum(BIGINT)', 'EXECUTE'));
END $$;

ROLLBACK;
