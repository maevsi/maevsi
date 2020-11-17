-- Revert maevsi:function_account_password_reset_request from pg

BEGIN;

DROP FUNCTION maevsi.account_password_reset_request;

COMMIT;
