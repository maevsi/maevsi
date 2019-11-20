-- Revert maevsi:enum_event_visibility from pg

BEGIN;

DROP TYPE event_visibility;

COMMIT;
