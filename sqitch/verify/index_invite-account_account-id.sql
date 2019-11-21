-- Verify maevsi:index_invite-account_account-id on pg

BEGIN;

SELECT 1/COUNT(*)
FROM   pg_class c
JOIN   pg_namespace n ON n.oid = c.relnamespace
WHERE  c.relname = 'idx_invite-account_account-id'
AND    n.nspname = 'maevsi';

ROLLBACK;
