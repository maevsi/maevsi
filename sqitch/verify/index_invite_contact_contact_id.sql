-- Verify maevsi:index_invite_contact_contact_id on pg

BEGIN;

SELECT 1/COUNT(*)
FROM   pg_class c
JOIN   pg_namespace n ON n.oid = c.relnamespace
WHERE  c.relname = 'idx_invite_contact_contact_id'
AND    n.nspname = 'maevsi';

ROLLBACK;
