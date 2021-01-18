-- Verify maevsi:function_invitation_contact_ids on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.invitation_contact_ids()', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.invitation_contact_ids()', 'EXECUTE'));
END $$;

ROLLBACK;
