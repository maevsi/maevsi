-- Verify maevsi:function_invites on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi_private.events_invited()', 'EXECUTE'));
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi_private.events_invited()', 'EXECUTE'));
END $$;

ROLLBACK;
