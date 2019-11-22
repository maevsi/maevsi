-- Verify maevsi:table_invite_contact on pg

BEGIN;

SELECT "id",
       "event_id",
       "contact_id"
FROM maevsi.invite_contact WHERE FALSE;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_table_privilege('maevsi_account', 'maevsi.invite_contact', 'SELECT, INSERT, UPDATE, DELETE'));
   ASSERT NOT (SELECT pg_catalog.has_table_privilege('maevsi_anonymous', 'maevsi.invite_contact', 'SELECT, INSERT, UPDATE, DELETE'));
END $$;

ROLLBACK;
