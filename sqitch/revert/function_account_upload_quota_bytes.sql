-- Revert maevsi:function_account_upload_quota_bytes from pg

BEGIN;

DROP FUNCTION maevsi.account_upload_quota_bytes;

COMMIT;
