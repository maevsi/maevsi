-- Revert maevsi:view_event_username from pg

BEGIN;

DROP VIEW maevsi.all_events_with_username;

COMMIT;
