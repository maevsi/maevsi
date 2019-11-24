-- Revert maevsi:function_invites from pg

BEGIN;

DROP FUNCTION maevsi_private.events_organized;

COMMIT;
