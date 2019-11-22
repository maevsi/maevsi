-- Verify maevsi:table_event_grouping on pg

BEGIN;

SELECT "id",
       "event_id",
       "event_group_id"
FROM maevsi.event_grouping WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.event_grouping', 'SELECT, INSERT, UPDATE, DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event_grouping', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event_grouping', 'INSERT, UPDATE, DELETE'));
END $$;

ROLLBACK;
