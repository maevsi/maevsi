-- Revert maevsi:table_invitation from pg

BEGIN;

DROP TABLE maevsi.invitation;

COMMIT;
