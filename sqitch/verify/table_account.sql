-- Verify maevsi:table_account on pg

BEGIN;

SELECT "id",
       "person_id",
       "username",
       "e-mail_address",
       "password_hash"
FROM maevsi_private.account WHERE FALSE;

ROLLBACK;
