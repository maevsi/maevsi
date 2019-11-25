-- Revert maevsi:function_account_register from pg

BEGIN;

DROP FUNCTION maevsi_private.account_register;

COMMIT;
