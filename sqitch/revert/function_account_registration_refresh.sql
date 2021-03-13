-- Revert maevsi:function_account_registration_refresh from pg

BEGIN;

DROP FUNCTION maevsi.account_registration_refresh;

COMMIT;
