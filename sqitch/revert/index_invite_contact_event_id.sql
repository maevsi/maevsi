-- Revert maevsi:index_invite_contact_event_id from pg

BEGIN;

DROP INDEX maevsi.idx_invite_contact_event_id;

COMMIT;
