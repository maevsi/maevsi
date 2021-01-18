-- Revert maevsi:index_invitation_event_id from pg

BEGIN;

DROP INDEX maevsi.idx_invitation_event_id;

COMMIT;
