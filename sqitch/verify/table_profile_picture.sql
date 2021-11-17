-- Verify maevsi:table_profile_picture on pg

BEGIN;

SELECT id,
       upload_storage_key,
       username
FROM maevsi.profile_picture WHERE FALSE;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.profile_picture', 'SELECT'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.profile_picture', 'INSERT'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.profile_picture', 'UPDATE'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.profile_picture', 'DELETE'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.profile_picture', 'SELECT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.profile_picture', 'INSERT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.profile_picture', 'UPDATE'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.profile_picture', 'DELETE'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_stomper', 'maevsi.profile_picture', 'SELECT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_stomper', 'maevsi.profile_picture', 'INSERT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_stomper', 'maevsi.profile_picture', 'UPDATE'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_stomper', 'maevsi.profile_picture', 'DELETE'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.profile_picture', 'SELECT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.profile_picture', 'INSERT'));
  ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.profile_picture', 'UPDATE'));
  ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_tusd', 'maevsi.profile_picture', 'DELETE'));
END $$;

ROLLBACK;
