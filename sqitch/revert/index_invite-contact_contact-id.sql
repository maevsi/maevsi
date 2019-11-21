-- Revert maevsi:index_invite-contact_contact-id from pg

BEGIN;

DROP INDEX maevsi."idx_invite-contact_contact-id";

COMMIT;
