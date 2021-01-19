-- Deploy maevsi:table_contact to pg
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: table_account

BEGIN;

CREATE TABLE maevsi.contact (
  id                          BIGSERIAL PRIMARY KEY,
  account_username            TEXT REFERENCES maevsi_private.account(username) ON DELETE CASCADE,
  email_address               TEXT CHECK (char_length(email_address) < 320 AND email_address ~* '^.+@.+\..+$'),
  email_address_hash          TEXT GENERATED ALWAYS AS (md5(lower(substring(email_address, '\S(?:.*\S)*')))) STORED,
  first_name                  TEXT CHECK (char_length(first_name) > 0 AND char_length(first_name) < 100),
  last_name                   TEXT CHECK (char_length(last_name) > 0 AND char_length(last_name) < 100),
  "address"                   TEXT CHECK (char_length("address") > 0 AND char_length("address") < 300),
  creator_account_username    TEXT REFERENCES maevsi_private.account(username) ON DELETE CASCADE NOT NULL
);

COMMENT ON TABLE maevsi.contact IS 'Contact data.';
COMMENT ON COLUMN maevsi.contact.id IS E'@omit create,update\nThe contact''s internal id.';
COMMENT ON COLUMN maevsi.contact.account_username IS 'The contact account''s username.';
COMMENT ON COLUMN maevsi.contact.email_address IS 'The contact''s email address.';
COMMENT ON COLUMN maevsi.contact.email_address_hash IS E'@omit create,update\nThe contact''s email address''s md5 hash.';
COMMENT ON COLUMN maevsi.contact.first_name IS 'The contact''s first name.';
COMMENT ON COLUMN maevsi.contact.last_name IS 'The contact''s last name.';
COMMENT ON COLUMN maevsi.contact.address IS 'The contact''s physical address.';
COMMENT ON COLUMN maevsi.contact.creator_account_username IS 'The contact creator''s username.';

-- GRANTs, RLS and POLICYs are specified in 'table_contact_policy`.

COMMIT;
