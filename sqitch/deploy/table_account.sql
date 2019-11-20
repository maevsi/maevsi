-- Deploy maevsi:table_account to pg
-- requires: schema_private
-- requires: table_person

BEGIN;

-- TODO: profile picture
CREATE TABLE maevsi_private.account (
    "id"                SERIAL PRIMARY KEY,
    "person_id"         INTEGER REFERENCES maevsi.person("id") NOT NULL,
    "username"          TEXT NOT NULL CHECK (char_length("username") < 100) UNIQUE,
    "e-mail_address"    TEXT NOT NULL CHECK (char_length("e-mail_address") < 320 AND "e-mail_address" ~* '^.+@.+\..+$') UNIQUE,
    "password_hash"     TEXT NOT NULL
);

COMMENT ON TABLE maevsi_private.account IS 'Account data.';

COMMIT;
