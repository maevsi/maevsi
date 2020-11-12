-- Verify maevsi:table_invite_contact on pg

BEGIN;

SELECT id,
       uuid,
       event_id,
       contact_id,
       invitation_feedback_id
FROM maevsi.invite_contact WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_contact', 'SELECT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_contact', 'INSERT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_contact', 'UPDATE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_contact', 'DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_contact', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_contact', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_contact', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_contact', 'DELETE'));
END $$;

ROLLBACK;
