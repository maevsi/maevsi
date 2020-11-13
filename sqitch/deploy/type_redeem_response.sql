-- Deploy maevsi:type_redeem_response to pg
-- requires: schema_public
-- requires: type_jwt

BEGIN;

CREATE TYPE maevsi.redeem_response AS (
  organizer_username TEXT,
  event_slug TEXT,
  jwt maevsi.jwt
);

COMMIT;
