-- Revert maevsi:table_contact from pg

BEGIN;

DROP TABLE maevsi.contact;

COMMIT;
