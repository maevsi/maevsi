-- Revert maevsi:table_event from pg

BEGIN;

DROP TABLE maevsi.event;

COMMIT;
