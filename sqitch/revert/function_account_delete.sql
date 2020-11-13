-- Revert maevsi:function_account_delete from pg

BEGIN;

DROP FUNCTION maevsi.account_delete;

COMMIT;
