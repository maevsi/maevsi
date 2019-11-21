-- Revert maevsi:function_account_password_change from pg

BEGIN;

DROP FUNCTION maevsi.account_password_change;

COMMIT;
