-- Revert maevsi:function_invitation_claim_array from pg

BEGIN;

DROP FUNCTION maevsi.invitation_claim_array;

COMMIT;
