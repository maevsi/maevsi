-- Revert maevsi:function_account_email_address_verification from pg

BEGIN;

DROP FUNCTION maevsi.account_email_address_verification;

COMMIT;
