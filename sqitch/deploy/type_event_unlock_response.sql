-- Deploy maevsi:type_event_unlock_response to pg
-- requires: schema_public
-- requires: type_jwt

BEGIN;

CREATE TYPE maevsi.event_unlock_response AS (
  author_username TEXT,
  event_slug TEXT,
  jwt maevsi.jwt
);

COMMIT;
