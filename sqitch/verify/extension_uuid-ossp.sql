-- Verify maevsi:extension_uuid-ossp on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'uuid-ossp';
SELECT has_function_privilege('maevsi.uuid_generate_v1mc()', 'execute');

ROLLBACK;
