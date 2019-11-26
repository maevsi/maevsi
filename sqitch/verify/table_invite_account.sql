-- Verify maevsi:table_invite_account on pg

BEGIN;

SELECT "id",
       "event_id",
       "username"
FROM maevsi.invite_account WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_account', 'SELECT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_account', 'INSERT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_account', 'UPDATE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_account', 'DELETE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_account', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_account', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_account', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_account', 'DELETE'));
END $$;

ROLLBACK;
