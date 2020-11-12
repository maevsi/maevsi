-- Revert maevsi:index_invite_contact_contact_id from pg

BEGIN;

DROP INDEX maevsi."idx_invite_contact_contact_id";

COMMIT;
