-- Revert maevsi:function_notification_acknowledge from pg

BEGIN;

DROP FUNCTION maevsi.notification_acknowledge;

COMMIT;
