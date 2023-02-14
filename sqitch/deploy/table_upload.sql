-- Deploy maevsi:table_event to pg
-- requires: schema_public
-- requires: schema_private
-- requires: table_account
-- requires: role_account
-- requires: role_tusd

BEGIN;

CREATE TABLE maevsi.upload (
  id             BIGSERIAL PRIMARY KEY,
  size_byte      BIGINT NOT NULL CHECK (size_byte > 0),
  storage_key    TEXT UNIQUE,
  username       TEXT REFERENCES maevsi_private.account(username) ON DELETE CASCADE NOT NULL,
  uuid           UUID NOT NULL UNIQUE DEFAULT gen_random_uuid()
);

COMMENT ON TABLE maevsi.upload IS 'An upload.';
COMMENT ON COLUMN maevsi.upload.id IS E'@omit create,update\nThe upload''s internal id.';
COMMENT ON COLUMN maevsi.upload.size_byte IS 'The upload''s size in bytes.';
COMMENT ON COLUMN maevsi.upload.storage_key IS 'The upload''s storage key.';
COMMENT ON COLUMN maevsi.upload.username IS 'The uploader''s username.';
COMMENT ON COLUMN maevsi.upload.uuid IS 'The upload''s UUID.';

GRANT SELECT ON TABLE maevsi.upload TO maevsi_account, maevsi_tusd;
GRANT UPDATE ON TABLE maevsi.upload TO maevsi_tusd;
GRANT DELETE ON TABLE maevsi.upload TO maevsi_tusd;

ALTER TABLE maevsi.upload ENABLE ROW LEVEL SECURITY;

-- Display the uploads that are linked to the own account.
CREATE POLICY upload_select_using ON maevsi.upload FOR SELECT USING (
    (SELECT current_user) = 'maevsi_tusd'
  OR
    username = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow tusd to update rows.
CREATE POLICY upload_update_using ON maevsi.upload FOR UPDATE USING (
  (SELECT current_user) = 'maevsi_tusd'
);

-- Only allow the upload's owner to delete rows.
CREATE POLICY upload_delete_using ON maevsi.upload FOR DELETE USING (
  (SELECT current_user) = 'maevsi_tusd'
);

COMMIT;
