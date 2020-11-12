-- Verify maevsi:table_contact on pg

BEGIN;

SELECT id,
       account_id,
       email_address,
       email_address_hash,
       first_name,
       last_name,
       address
FROM maevsi.contact WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.contact', 'SELECT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.contact', 'INSERT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.contact', 'UPDATE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.contact', 'DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.contact', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.contact', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.contact', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.contact', 'DELETE'));
END $$;

ROLLBACK;
