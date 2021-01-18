-- Deploy maevsi:type_jwt to pg
-- requires: schema_public

BEGIN;

CREATE TYPE maevsi.jwt AS (
  id UUID,
  role TEXT,
  username TEXT,
  invitations UUID[],
  "exp" BIGINT
);

COMMIT;
