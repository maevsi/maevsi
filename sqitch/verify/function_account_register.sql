-- Verify maevsi:function_account_register on pg

BEGIN;

SELECT pg_catalog.has_function_privilege('maevsi.account_register(TEXT, TEXT, TEXT)', 'execute');

ROLLBACK;
