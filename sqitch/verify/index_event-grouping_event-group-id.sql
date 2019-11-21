-- Verify maevsi:index_event-grouping_event-group-id on pg

BEGIN;

SELECT 1/COUNT(*)
FROM   pg_class c
JOIN   pg_namespace n ON n.oid = c.relnamespace
WHERE  c.relname = 'idx_event-grouping_event-group-id'
AND    n.nspname = 'maevsi';

ROLLBACK;
