-- Revert maevsi:function_event_invitee_count_maximum from pg

BEGIN;

DROP FUNCTION maevsi.event_invitee_count_maximum;

COMMIT;
