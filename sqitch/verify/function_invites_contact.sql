-- Verify maevsi:function_invites_contact on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi_private.invites_contact()', 'EXECUTE'));
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi_private.invites_contact()', 'EXECUTE'));
END $$;

ROLLBACK;
