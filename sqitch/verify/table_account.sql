-- Verify maevsi:table_account on pg

BEGIN;

SELECT "contact_id",
       "username",
       "e-mail_address",
       "e-mail_address_verification",
       "password_hash",
       "last_activity"
FROM maevsi_private.account WHERE FALSE;

ROLLBACK;
