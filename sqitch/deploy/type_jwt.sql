-- Deploy maevsi:type_jwt to pg
-- requires: schema_public

BEGIN;

CREATE TYPE maevsi.jwt AS (
  id UUID,
  role TEXT,
  account_id BIGINT,
  username TEXT,
  invites UUID[],
  "exp" BIGINT
);

COMMIT;
