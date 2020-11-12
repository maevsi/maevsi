-- Verify maevsi:table_invitation_feedback_data on pg

BEGIN;

SELECT id,
       invitation_feedback,
       paper_invitation_feedback
FROM maevsi.invitation_feedback_data WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invitation_feedback_data', 'SELECT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invitation_feedback_data', 'INSERT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invitation_feedback_data', 'UPDATE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invitation_feedback_data', 'DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invitation_feedback_data', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invitation_feedback_data', 'INSERT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invitation_feedback_data', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invitation_feedback_data', 'DELETE'));
END $$;

ROLLBACK;
