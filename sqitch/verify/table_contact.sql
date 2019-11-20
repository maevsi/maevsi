-- Verify maevsi:table_contact on pg

BEGIN;

SELECT "id",
       "first_name",
       "last_name",
       "address",
       "e-mail_address"
FROM maevsi.contact WHERE FALSE;

ROLLBACK;
