-- Revert maevsi:function_event_is_existing from pg

BEGIN;

DROP FUNCTION maevsi.event_is_existing;

COMMIT;
