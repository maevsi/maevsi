-- Revert maevsi:function_redeem from pg

BEGIN;

DROP FUNCTION maevsi.redeem;

COMMIT;
