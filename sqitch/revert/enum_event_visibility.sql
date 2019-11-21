-- Revert maevsi:enum_event_visibility from pg

BEGIN;

DROP TYPE maevsi.event_visibility;

COMMIT;
