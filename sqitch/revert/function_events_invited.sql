-- Revert maevsi:function_events_invited from pg

BEGIN;

DROP FUNCTION maevsi_private.events_invited;

COMMIT;
