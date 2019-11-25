-- Deploy maevsi:enum_paper_invitation_feedback to pg

BEGIN;

CREATE TYPE maevsi.invitation_feedback_paper AS ENUM (
  'paper',
  'digital'
);

COMMENT ON TYPE maevsi.invitation_feedback_paper IS 'Possible choices on how to receive a paper invitation: paper, digital.';

COMMIT;
