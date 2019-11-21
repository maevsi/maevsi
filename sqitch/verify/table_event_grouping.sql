-- Verify maevsi:table_event_grouping on pg

BEGIN;

SELECT "id",
       "event_id",
       "event_group_id"
FROM maevsi.event_grouping WHERE FALSE;

ROLLBACK;
