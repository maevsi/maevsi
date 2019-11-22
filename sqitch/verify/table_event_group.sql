-- Verify maevsi:table_event_group on pg

BEGIN;

SELECT "id",
       "name",
       "visibility",
       "organizer_id",
       "archived"
FROM maevsi.event_group WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.event_group', 'SELECT, INSERT, UPDATE, DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event_group', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event_group', 'INSERT, UPDATE, DELETE'));
END $$;

ROLLBACK;
