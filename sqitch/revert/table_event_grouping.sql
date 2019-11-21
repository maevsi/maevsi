-- Revert maevsi:table_event_grouping from pg

BEGIN;

DROP TABLE maevsi.event_grouping;

COMMIT;
