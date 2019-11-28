-- Revert maevsi:function_invites from pg

BEGIN;

DROP FUNCTION maevsi.events_organized;

COMMIT;
