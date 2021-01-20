-- Revert maevsi:table_notification from pg

BEGIN;

DROP TRIGGER maevsi_private_notification ON maevsi_private.notification;
DROP FUNCTION maevsi_private.notify;
DROP TABLE maevsi_private.notification;

COMMIT;
