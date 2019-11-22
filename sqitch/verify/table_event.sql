-- Verify maevsi:table_event on pg

BEGIN;

SELECT "id",
       "name",
       "visibility",
       "organizer_id",
       "place",
       "timestamp",
       "interval"
       "archived"
FROM maevsi.event WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.event', 'SELECT, INSERT, UPDATE, DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event', 'INSERT, UPDATE, DELETE'));
END $$;

ROLLBACK;
