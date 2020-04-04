-- Verify maevsi:table_token on pg

BEGIN;

SELECT "id",
       "token",
       "valid_until"
FROM maevsi_private.token WHERE FALSE;

DO $$
BEGIN
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.token', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.token', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.token', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi_private.token', 'DELETE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.token', 'SELECT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.token', 'INSERT'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.token', 'UPDATE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi_private.token', 'DELETE'));
END $$;

ROLLBACK;
