-- Deploy maevsi:function_profile_picture_set to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: table_profile_picture

BEGIN;

CREATE FUNCTION maevsi.profile_picture_set(
  storage_key TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO maevsi.profile_picture(username, upload_storage_key)
  VALUES (
    current_setting('jwt.claims.username', true)::TEXT,
    $1
  )
  ON CONFLICT (username)
  DO UPDATE
  SET upload_storage_key = $1;
END;
$$ LANGUAGE PLPGSQL STRICT VOLATILE SECURITY INVOKER;

COMMENT ON FUNCTION maevsi.profile_picture_set(TEXT) IS 'Sets the picture with the given storage key as the invoker''s profile picture.';

GRANT EXECUTE ON FUNCTION maevsi.profile_picture_set(TEXT) TO maevsi_account;
GRANT USAGE ON SEQUENCE maevsi.profile_picture_id_seq TO maevsi_account;

COMMIT;
