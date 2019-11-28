-- Revert maevsi:function_event_contact_feedback_data from pg

BEGIN;

DROP FUNCTION maevsi.event_contact_feedback_data(TEXT, TEXT);

COMMIT;
