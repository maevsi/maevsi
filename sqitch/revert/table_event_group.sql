-- Revert maevsi:table_event_group from pg

BEGIN;

DROP TABLE maevsi.event_group;

COMMIT;
