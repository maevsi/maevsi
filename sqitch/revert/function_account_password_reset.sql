-- Revert maevsi:function_account_password_reset from pg

BEGIN;

DROP FUNCTION maevsi.account_password_reset;

COMMIT;
