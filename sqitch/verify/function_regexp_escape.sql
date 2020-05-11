-- Verify maevsi:function_regexp_escape on pg

BEGIN;

DO $$
BEGIN
   ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.regexp_escape(TEXT)', 'EXECUTE'));
   ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.regexp_escape(TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
