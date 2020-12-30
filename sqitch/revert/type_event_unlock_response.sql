-- Revert maevsi:type_event_unlock_response from pg

BEGIN;

DROP TYPE maevsi.event_unlock_response;

COMMIT;
