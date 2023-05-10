-- Deploy maevsi:table_contact to pg
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: table_account

BEGIN;

CREATE TABLE maevsi.contact (
  id                         BIGSERIAL PRIMARY KEY,
  account_username           TEXT REFERENCES maevsi_private.account(username),
  "address"                  TEXT CHECK (char_length("address") > 0 AND char_length("address") < 300),
  author_account_username    TEXT NOT NULL REFERENCES maevsi_private.account(username) ON DELETE CASCADE,
  email_address              TEXT CHECK (char_length(email_address) < 320 AND email_address ~ '^.+@.+\..+$' AND email_address ~ '^[^A-Z]+$'),
  email_address_hash         TEXT GENERATED ALWAYS AS (md5(lower(substring(email_address, '\S(?:.*\S)*')))) STORED,
  first_name                 TEXT CHECK (char_length(first_name) > 0 AND char_length(first_name) < 100),
  last_name                  TEXT CHECK (char_length(last_name) > 0 AND char_length(last_name) < 100),
  phone_number               TEXT CHECK (phone_number ~ '^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$'),
  "url"                      TEXT CHECK (char_length("url") < 300 AND "url" ~ '^https:\/\/'),
  UNIQUE (author_account_username, account_username)
);

COMMENT ON TABLE maevsi.contact IS 'Contact data.';
COMMENT ON COLUMN maevsi.contact.id IS E'@omit create,update\nThe contact''s internal id.';
COMMENT ON COLUMN maevsi.contact.account_username IS 'The contact account''s username.';
COMMENT ON COLUMN maevsi.contact.address IS 'The contact''s physical address.';
COMMENT ON COLUMN maevsi.contact.author_account_username IS 'The contact author''s username.';
COMMENT ON COLUMN maevsi.contact.email_address IS 'The contact''s email address.';
COMMENT ON COLUMN maevsi.contact.email_address_hash IS E'@omit create,update\nThe contact''s email address''s md5 hash.';
COMMENT ON COLUMN maevsi.contact.first_name IS 'The contact''s first name.';
COMMENT ON COLUMN maevsi.contact.last_name IS 'The contact''s last name.';
COMMENT ON COLUMN maevsi.contact.phone_number IS 'The contact''s international phone number.';
COMMENT ON COLUMN maevsi.contact.url IS 'The contact''s website url.';

-- GRANTs, RLS and POLICYs are specified in 'table_contact_policy`.

COMMIT;
