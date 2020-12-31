-- Verify maevsi:table_event on pg

BEGIN;

SELECT id,
       name,
       slug,
       visibility,
       invitee_count_maximum,
       organizer_username,
       description,
       place,
       start,
       "end",
       is_archived,
       is_in_person,
       is_remote
FROM maevsi.event WHERE FALSE;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.event', 'SELECT'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.event', 'INSERT'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.event', 'UPDATE'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.event', 'DELETE'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event', 'SELECT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event', 'INSERT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event', 'UPDATE'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.event', 'DELETE'));
END $$;

ROLLBACK;
