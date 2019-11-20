-- Revert maevsi:index_account_contact-id from pg

BEGIN;

DROP INDEX maevsi_private."idx_account_contact-id";

COMMIT;
