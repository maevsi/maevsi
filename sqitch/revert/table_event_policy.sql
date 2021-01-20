-- Revert maevsi:table_event_policy from pg

BEGIN;

DROP POLICY event_insert ON maevsi.event;
DROP POLICY event_select ON maevsi.event;

COMMIT;
