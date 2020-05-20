-- Revert maevsi:table_profile_picture from pg

BEGIN;

DROP TABLE maevsi.profile_picture;

COMMIT;
