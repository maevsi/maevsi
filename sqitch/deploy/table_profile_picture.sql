-- Deploy maevsi:table_profile_picture to pg
-- requires: schema_public
-- requires: schema_private
-- requires: table_account
-- requires: table_upload
-- requires: role_account
-- requires: role_anonymous
-- requires: role_tusd

BEGIN;

CREATE TABLE maevsi.profile_picture (
    "username"              TEXT REFERENCES maevsi_private.account("username") NOT NULL UNIQUE,
    "upload_storage_key"    TEXT REFERENCES maevsi.upload("storage_key") NOT NULL
);

COMMENT ON TABLE maevsi.profile_picture IS 'Mapping of usernames to upload storage keys.';
COMMENT ON COLUMN maevsi.profile_picture.username IS 'The account''s username.';
COMMENT ON COLUMN maevsi.profile_picture.upload_storage_key IS 'The upload storage key.';

GRANT SELECT ON TABLE maevsi.profile_picture TO maevsi_account, maevsi_anonymous, maevsi_tusd;
GRANT INSERT, DELETE, UPDATE ON TABLE maevsi.profile_picture TO maevsi_account;
GRANT DELETE ON TABLE maevsi.profile_picture TO maevsi_tusd;

ALTER TABLE maevsi.profile_picture ENABLE ROW LEVEL SECURITY;

-- Make all profile pictures accessible by everyone.
CREATE POLICY profile_picture_select ON maevsi.profile_picture FOR SELECT USING (
    TRUE
);

-- Only allow inserts with a username that matches the invoker's username.
CREATE POLICY profile_picture_insert ON maevsi.profile_picture FOR INSERT WITH CHECK (
    "username" = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow updates to the item with the username that matches the invoker's username.
CREATE POLICY profile_picture_update ON maevsi.profile_picture FOR UPDATE USING (
    "username" = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow deletes for the item with the username that matches the invoker's username.
CREATE POLICY profile_picture_delete ON maevsi.profile_picture FOR DELETE USING (
        (SELECT current_user) = 'maevsi_tusd'
    OR
        "username" = current_setting('jwt.claims.username', true)::TEXT
);

COMMIT;
