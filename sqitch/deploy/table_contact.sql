-- Deploy maevsi:table_contact to pg
-- requires: schema_public
-- requires: role_account

BEGIN;

CREATE TABLE maevsi.contact (
    "id"                SERIAL PRIMARY KEY,
    "first_name"        TEXT CHECK (char_length("first_name") < 100),
    "last_name"         TEXT CHECK (char_length("last_name") < 100),
    "address"           TEXT CHECK (char_length("address") < 300),
    "e-mail_address"    TEXT CHECK (char_length("e-mail_address") < 320 AND "e-mail_address" ~* '^.+@.+\..+$')
);

COMMENT ON TABLE maevsi.contact IS 'Contact data.';
COMMENT ON COLUMN maevsi.contact.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.contact.first_name IS 'The contact''s first name.';
COMMENT ON COLUMN maevsi.contact.last_name IS 'The contact''s last name.';
COMMENT ON COLUMN maevsi.contact.address IS 'The contact''s physical address.';
COMMENT ON COLUMN maevsi.contact."e-mail_address" IS 'The contact''s e-mail address.';

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE maevsi.contact TO maevsi_account;

COMMIT;
