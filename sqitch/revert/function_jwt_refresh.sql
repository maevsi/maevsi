-- Revert maevsi:function_jwt_refresh from pg

BEGIN;

DROP FUNCTION maevsi.jwt_refresh;

COMMIT;
