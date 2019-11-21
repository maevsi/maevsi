-- Verify maevsi:function_account_password_change on pg

BEGIN;

SELECT pg_catalog.has_function_privilege('maevsi.account_password_change(TEXT, TEXT)', 'execute');

ROLLBACK;
