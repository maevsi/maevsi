-- Revert maevsi:function_event_unlock from pg

BEGIN;

DROP FUNCTION maevsi.event_unlock;

COMMIT;
