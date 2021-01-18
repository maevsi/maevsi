-- Revert maevsi:table_contact_policy from pg

BEGIN;

DROP POLICY contact_select ON maevsi.contact;

COMMIT;
