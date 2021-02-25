-- Revert maevsi:function_account_registration from pg

BEGIN;

DROP FUNCTION maevsi.account_registration;

COMMIT;
