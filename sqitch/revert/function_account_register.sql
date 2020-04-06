-- Revert maevsi:function_account_register from pg

BEGIN;

DROP FUNCTION maevsi.account_register;

COMMIT;
