-- Verify maevsi:extension_uuid-ossp on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'uuid-ossp';
SELECT has_function_privilege('maevsi.uuid_generate_v4()', 'EXECUTE');

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.uuid_generate_v4()', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.uuid_generate_v4()', 'EXECUTE'));
END $$;

ROLLBACK;
