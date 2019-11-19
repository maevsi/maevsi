-- Revert maevsi:table_person from pg

BEGIN;

DROP TABLE maevsi.person;

COMMIT;
