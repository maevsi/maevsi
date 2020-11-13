-- Revert maevsi:function_event_delete from pg

BEGIN;

DROP FUNCTION maevsi.event_delete;

COMMIT;
