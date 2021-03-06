-- Deploy maevsi:table_jwt to pg
-- requires: schema_private
-- requires: extension_uuid-ossp

BEGIN;

CREATE TABLE maevsi_private.jwt (
  id       BIGSERIAL PRIMARY KEY,
  token    maevsi.jwt NOT NULL UNIQUE,
  uuid     UUID NOT NULL UNIQUE DEFAULT maevsi.uuid_generate_v1mc()
);

COMMENT ON TABLE maevsi_private.jwt IS 'A list of tokens.';
COMMENT ON COLUMN maevsi_private.jwt.id IS 'The token''s id.';
COMMENT ON COLUMN maevsi_private.jwt.token IS 'The token.';
COMMENT ON COLUMN maevsi_private.jwt.uuid IS 'The token''s UUID.';

COMMIT;
