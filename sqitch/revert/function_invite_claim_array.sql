-- Revert maevsi:function_invite_claim_array from pg

BEGIN;

DROP FUNCTION maevsi_private.invite_claim_array;

COMMIT;
