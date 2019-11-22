-- Verify maevsi:extension_pgcrypto on pg

BEGIN;

SELECT 1/count(*) FROM pg_extension WHERE extname = 'pgcrypto';
SELECT has_function_privilege('maevsi.crypt(text, text)', 'EXECUTE');
SELECT has_function_privilege('maevsi.gen_salt(text)', 'EXECUTE');

ROLLBACK;
