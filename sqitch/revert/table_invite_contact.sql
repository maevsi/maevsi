-- Revert maevsi:table_invite_contact from pg

BEGIN;

DROP TABLE maevsi.invite_contact;

COMMIT;
