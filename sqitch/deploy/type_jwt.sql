-- Deploy maevsi:type_jwt to pg
-- requires: schema_public

BEGIN;

CREATE TYPE maevsi.jwt AS (
  role TEXT,
  account_id INTEGER,
  username TEXT,
  invites TEXT
);

COMMIT;
