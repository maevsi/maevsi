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

ROLLBACK;
