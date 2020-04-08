-- Revert maevsi:function_invitee_count from pg

BEGIN;

DROP FUNCTION maevsi.invitee_count;

COMMIT;
