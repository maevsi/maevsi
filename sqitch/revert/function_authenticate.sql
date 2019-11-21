-- Revert maevsi:function_authenticate from pg

BEGIN;

DROP FUNCTION maevsi.authenticate;

COMMIT;
