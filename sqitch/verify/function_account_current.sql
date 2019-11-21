-- Verify maevsi:function_account_current on pg

BEGIN;

SELECT pg_catalog.has_function_privilege('maevsi.account_current()', 'execute');

ROLLBACK;
