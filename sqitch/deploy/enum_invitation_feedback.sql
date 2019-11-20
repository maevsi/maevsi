-- Deploy maevsi:enum_invitation_feedback to pg
-- requires: schema_public

BEGIN;

CREATE TYPE invitation_feedback AS ENUM (
  'accepted',
  'canceled'
);

COMMENT ON TYPE invitation_feedback IS 'Possible answers to an invitation: accepted, canceled.';

COMMIT;
