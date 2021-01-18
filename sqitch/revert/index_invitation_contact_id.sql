-- Revert maevsi:index_invitation_contact_id from pg

BEGIN;

DROP INDEX maevsi.idx_invitation_contact_id;

COMMIT;
