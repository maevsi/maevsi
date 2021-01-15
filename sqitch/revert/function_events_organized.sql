-- Revert maevsi:function_events_organized from pg

BEGIN;

DROP FUNCTION maevsi.events_organized;

COMMIT;
