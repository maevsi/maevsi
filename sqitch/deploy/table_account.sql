-- Deploy maevsi:table_account to pg
-- requires: schema_private
-- requires: schema_public
-- requires: extension_uuid-ossp

BEGIN;

CREATE TABLE maevsi_private.account (
    id                            BIGSERIAL PRIMARY KEY,
    username                      TEXT NOT NULL CHECK (char_length(username) < 100 AND username ~* '^[-A-Za-z0-9]+$') UNIQUE,
    email_address                 TEXT NOT NULL CHECK (char_length(email_address) < 320 AND email_address ~* '^.+@.+\..+$') UNIQUE,
    email_address_verification    UUID DEFAULT maevsi.uuid_generate_v1mc(),
    password_hash                 TEXT NOT NULL,
    created                       TIMESTAMP NOT NULL DEFAULT NOW(),
    last_activity                 TIMESTAMP NOT NULL DEFAULT NOW(),
    upload_quota_bytes            INTEGER NOT NULL DEFAULT 10485760 -- 10 mebibyte
);

COMMENT ON TABLE maevsi_private.account IS 'Account data.';
COMMENT ON COLUMN maevsi_private.account.username IS 'The account''s username.';
COMMENT ON COLUMN maevsi_private.account.email_address IS 'The account''s e-mail address for account related information.';
COMMENT ON COLUMN maevsi_private.account.email_address_verification IS 'The UUID that is used to verify an e-mail address, or null if already verified.';
COMMENT ON COLUMN maevsi_private.account.password_hash IS 'The account''s password, hashed and salted.';
COMMENT ON COLUMN maevsi_private.account.created IS 'Timestamp at which the account was last active.';
COMMENT ON COLUMN maevsi_private.account.last_activity IS 'Timestamp at which the account last requested an access token.';
COMMENT ON COLUMN maevsi_private.account.upload_quota_bytes IS 'The account''s upload quota in bytes.';

COMMIT;
