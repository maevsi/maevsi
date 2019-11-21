-- Revert maevsi:function_account_current from pg

BEGIN;

DROP FUNCTION maevsi.account_current;

COMMIT;
