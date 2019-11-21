-- Revert maevsi:function_account_current_id from pg

BEGIN;

DROP FUNCTION maevsi.account_current_id;

COMMIT;
