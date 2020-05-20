-- Revert maevsi:function_profile_picture_set from pg

BEGIN;

DROP FUNCTION maevsi.profile_picture_set;

COMMIT;
