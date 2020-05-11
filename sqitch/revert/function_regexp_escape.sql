-- Revert maevsi:function_regexp_escape from pg

BEGIN;

DROP FUNCTION maevsi.regexp_escape;

COMMIT;
