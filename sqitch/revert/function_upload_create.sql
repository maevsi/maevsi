-- Revert maevsi:function_upload_create from pg

BEGIN;

DROP FUNCTION maevsi.upload_create;

COMMIT;
