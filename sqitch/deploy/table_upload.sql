-- Deploy maevsi:table_event to pg
-- requires: schema_public
-- requires: schema_private
-- requires: table_account
-- requires: role_account
-- requires: role_tusd

BEGIN;

CREATE TABLE maevsi.upload (
    "id"            UUID PRIMARY KEY DEFAULT maevsi.uuid_generate_v1mc(),
    "storage_key"   TEXT UNIQUE,
    "username"      TEXT REFERENCES maevsi_private.account("username") NOT NULL,
    "size_byte"     INTEGER NOT NULL CHECK ("size_byte" > 0)
);

COMMENT ON TABLE maevsi.upload IS 'An upload.';
COMMENT ON COLUMN maevsi.upload.id IS 'The upload''s id.';
COMMENT ON COLUMN maevsi.upload.storage_key IS 'The upload''s storage key.';
COMMENT ON COLUMN maevsi.upload.username IS 'The uploader''s username.';
COMMENT ON COLUMN maevsi.upload.size_byte IS 'The upload''s size in bytes.';

GRANT SELECT ON TABLE maevsi.upload TO maevsi_account, maevsi_tusd;
GRANT UPDATE ON TABLE maevsi.upload TO maevsi_tusd;

ALTER TABLE maevsi.upload ENABLE ROW LEVEL SECURITY;

-- Display the uploads that are linked to the own account.
CREATE POLICY upload_select_using ON maevsi.upload FOR SELECT USING (
        (SELECT current_user) = 'maevsi_tusd'
    OR
        username = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow tusd to make changes.
CREATE POLICY upload_update_using ON maevsi.upload FOR UPDATE USING (
    (SELECT current_user) = 'maevsi_tusd'
);

COMMIT;
