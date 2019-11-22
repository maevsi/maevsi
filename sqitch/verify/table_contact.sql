-- Verify maevsi:table_contact on pg

BEGIN;

SELECT "id",
       "first_name",
       "last_name",
       "address",
       "e-mail_address"
FROM maevsi.contact WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.contact', 'SELECT, INSERT, UPDATE, DELETE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.contact', 'SELECT, INSERT, UPDATE, DELETE'));
END $$;

ROLLBACK;
