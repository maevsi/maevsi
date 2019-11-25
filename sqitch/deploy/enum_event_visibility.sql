-- Deploy maevsi:enum_event_visibility to pg
-- requires: schema_public

BEGIN;

CREATE TYPE maevsi.event_visibility AS ENUM (
  'public',
  'limited', -- TODO: implementation in external SQL structure
  'private'
);

COMMENT ON TYPE maevsi.event_visibility IS 'Possible visibilities of events and event groups: public, limited, private.';

COMMIT;
