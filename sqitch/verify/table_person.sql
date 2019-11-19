-- Verify maevsi:table_person on pg

BEGIN;

SELECT "id",
       "first_name",
       "last_name",
       "address",
       "e-mail_address"
FROM maevsi.person WHERE FALSE;

ROLLBACK;
