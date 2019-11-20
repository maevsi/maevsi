-- Deploy maevsi:table_person to pg
-- requires: schema_public

BEGIN;

CREATE TABLE maevsi.person (
    "id"                SERIAL PRIMARY KEY,
    "first_name"        TEXT CHECK (char_length("first_name") < 100),
    "last_name"         TEXT CHECK (char_length("last_name") < 100),
    "address"           TEXT CHECK (char_length("address") < 300),
    "e-mail_address"    TEXT CHECK (char_length("e-mail_address") < 320 AND "e-mail_address" ~* '^.+@.+\..+$')
);

COMMIT;
