-- Verify maevsi:table_invite_account on pg

BEGIN;

SELECT "id",
       "event_id",
       "account_id"
FROM maevsi.invite_account WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_account', 'SELECT, INSERT, UPDATE, DELETE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_account', 'SELECT, INSERT, UPDATE, DELETE'));
END $$;

ROLLBACK;
