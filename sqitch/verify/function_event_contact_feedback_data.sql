-- Verify maevsi:function_event_contact_feedback_data on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.event_contact_feedback_data(TEXT, TEXT)', 'EXECUTE'));
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.event_contact_feedback_data(TEXT, TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
