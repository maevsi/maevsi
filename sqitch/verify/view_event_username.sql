-- Verify maevsi:view_event_username on pg

BEGIN;

SELECT "id",
       "name",
       "visibility",
       "organizer_id",
       "place",
       "timestamp",
       "interval",
       "archived",
       "username"
FROM maevsi.all_events_with_username WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.all_events_with_username', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.all_events_with_username', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.all_events_with_username', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.all_events_with_username', 'DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.all_events_with_username', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.all_events_with_username', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.all_events_with_username', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.all_events_with_username', 'DELETE'));
END $$;

ROLLBACK;
