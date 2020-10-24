-- Deploy maevsi:type_jwt to pg
-- requires: schema_public

BEGIN;

CREATE TYPE maevsi.jwt AS (
  "id" UUID,
  "exp" BIGINT,
  "role" TEXT,
  "account_id" INTEGER,
  "username" TEXT,
  "invites" UUID[]
);

COMMIT;
