-- Revert maevsi:function_account_is_existing from pg

BEGIN;

DROP FUNCTION maevsi.account_is_existing;

COMMIT;
