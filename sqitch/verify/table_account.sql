-- Verify maevsi:table_account on pg

BEGIN;

SELECT "id",
       "username",
       "email_address",
       "email_address_verification",
       "password_hash",
       "last_activity"
FROM maevsi_private.account WHERE FALSE;

DO $$
BEGIN
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.account', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.account', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.account', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.account', 'DELETE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.account', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.account', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.account', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.account', 'DELETE'));
END $$;

ROLLBACK;
