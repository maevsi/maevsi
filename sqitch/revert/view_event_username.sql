-- Revert maevsi:view_event_username from pg

BEGIN;

DROP VIEW maevsi.events_with_username;

COMMIT;
