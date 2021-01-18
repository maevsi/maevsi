-- Verify maevsi:extension_uuid-ossp on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'uuid-ossp';
SELECT has_function_privilege('maevsi.uuid_generate_v1mc()', 'EXECUTE');

DO $$
BEGIN
  ASSERT (SELECT pg_catalog.has_function_privilege('maevsi_account', 'maevsi.uuid_generate_v1mc()', 'EXECUTE'));
  ASSERT NOT (SELECT pg_catalog.has_function_privilege('maevsi_anonymous', 'maevsi.uuid_generate_v1mc()', 'EXECUTE'));
END $$;

ROLLBACK;
