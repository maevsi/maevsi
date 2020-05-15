-- Deploy maevsi:function_upload_create to pg
-- requires: privilege_execute_revoke
-- requires: extension_uuid-ossp
-- requires: schema_public
-- requires: schema_private
-- requires: role_account
-- requires: table_upload
-- requires: table_account

BEGIN;

CREATE FUNCTION maevsi.upload_create("sizeByte" INTEGER)
RETURNS UUID AS $$
DECLARE
    "_id" UUID;
BEGIN
  IF  COALESCE((
        SELECT SUM("size_byte")
        FROM maevsi.upload
        WHERE username = current_setting('jwt.claims.username', true)::TEXT
      ), 0) + $1 <= (
        SELECT "upload_quota_bytes"
        FROM maevsi_private.account
        WHERE username = current_setting('jwt.claims.username', true)::TEXT
      )
  THEN
    INSERT INTO maevsi.upload ("username", "size_byte")
    VALUES (current_setting('jwt.claims.username', true)::TEXT, $1)
    RETURNING upload.id INTO "_id";

    RETURN "_id";
  ELSE
    RAISE 'Upload quota limit reached!' USING ERRCODE = 'disk_full';
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT VOLATILE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.upload_create(INTEGER) IS 'Creates an upload with the given size if quota is available.';

GRANT EXECUTE ON FUNCTION maevsi.upload_create(INTEGER) TO maevsi_account;

COMMIT;
