-- Deploy maevsi:table_token to pg
-- requires: schema_private
-- requires: extension_uuid-ossp

BEGIN;

CREATE TABLE maevsi_private.token (
    "id"          UUID PRIMARY KEY DEFAULT maevsi.uuid_generate_v1mc(),
    "token"       maevsi.jwt NOT NULL UNIQUE,
    "valid_until" TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '1 year'
);

COMMENT ON TABLE maevsi_private.token IS 'A list of tokens.';
COMMENT ON COLUMN maevsi_private.token.id IS 'The token''s id.';
COMMENT ON COLUMN maevsi_private.token.token IS 'The token.';
COMMENT ON COLUMN maevsi_private.token.valid_until IS 'The token''s end of validity.';

COMMIT;
