-- Verify maevsi:table_notification on pg

BEGIN;

SELECT id,
       channel,
       payload,
       "timestamp",
       is_acknowledged
FROM maevsi_private.notification WHERE FALSE;

ROLLBACK;
