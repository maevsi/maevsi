-- Verify maevsi:index_event_author_username on pg

BEGIN;

SELECT 1/COUNT(*)
FROM   pg_class c
JOIN   pg_namespace n ON n.oid = c.relnamespace
WHERE  c.relname = 'idx_event_author_username'
AND    n.nspname = 'maevsi';

ROLLBACK;
