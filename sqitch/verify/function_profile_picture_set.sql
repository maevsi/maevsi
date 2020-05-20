-- Verify maevsi:function_profile_picture_set on pg

BEGIN;

DO $$
BEGIN
   ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.profile_picture_set(TEXT)', 'EXECUTE'));
   ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.profile_picture_set(TEXT)', 'EXECUTE'));
END $$;

ROLLBACK;
