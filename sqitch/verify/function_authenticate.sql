-- Verify maevsi:function_authenticate on pg

BEGIN;

SELECT pg_catalog.has_function_privilege('maevsi.authenticate(TEXT, TEXT)', 'execute');

ROLLBACK;
