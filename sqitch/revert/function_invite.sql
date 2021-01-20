-- Revert maevsi:function_invite from pg

BEGIN;

DROP FUNCTION maevsi.invite;

COMMIT;
