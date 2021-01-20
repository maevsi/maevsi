-- Verify maevsi:function_invite on pg

BEGIN;

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.invite(BIGINT)', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.invite(BIGINT)', 'EXECUTE'));
END $$;

ROLLBACK;
