-- Verify maevsi:table_event_group on pg

BEGIN;

SELECT "id",
       "name",
       "visibility",
       "organizer_id",
       "archived"
FROM maevsi.event_group WHERE FALSE;

ROLLBACK;
