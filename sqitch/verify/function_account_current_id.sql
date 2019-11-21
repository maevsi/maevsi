-- Verify maevsi:function_account_current_id on pg

BEGIN;

SELECT pg_catalog.has_function_privilege('maevsi.account_current_id()', 'execute');

ROLLBACK;
