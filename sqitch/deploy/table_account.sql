-- Deploy maevsi:table_account to pg
-- requires: schema_private
-- requires: table_contact

BEGIN;

-- TODO: profile picture
CREATE TABLE maevsi_private.account (
    "id"                SERIAL PRIMARY KEY,
    "contact_id"        INTEGER REFERENCES maevsi.contact("id") NOT NULL,
    "username"          TEXT NOT NULL CHECK (char_length("username") < 100) UNIQUE,
    "e-mail_address"    TEXT NOT NULL CHECK (char_length("e-mail_address") < 320 AND "e-mail_address" ~* '^.+@.+\..+$') UNIQUE,
    "password_hash"     TEXT NOT NULL
);

COMMENT ON TABLE maevsi_private.account IS 'Account data.';
COMMENT ON COLUMN maevsi_private.account.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi_private.account.contact_id IS 'A reference to the account''s contact.';
COMMENT ON COLUMN maevsi_private.account.username IS 'The account''s username.';
COMMENT ON COLUMN maevsi_private.account."e-mail_address" IS 'The account''s e-mail address for account related information.';
COMMENT ON COLUMN maevsi_private.account.password_hash IS 'The account''s password, hashed and salted.';

COMMIT;
