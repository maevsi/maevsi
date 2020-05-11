-- Verify maevsi:table_upload on pg

BEGIN;

SELECT "id",
       "storage_key",
       "account_id",
       "size_byte"
FROM maevsi.upload WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.upload', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.upload', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.upload', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.upload', 'DELETE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.upload', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.upload', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.upload', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.upload', 'DELETE'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.upload', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.upload', 'INSERT'));
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.upload', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.upload', 'DELETE'));
END $$;

ROLLBACK;
