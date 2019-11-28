-- Revert maevsi:function_invite_feedback_ids from pg

BEGIN;

DROP FUNCTION maevsi_private.invite_feedback_ids;

COMMIT;
