-- Deploy maevsi:table_invitation to pg
-- requires: schema_public
-- requires: table_event
-- requires: table_contact
-- requires: enum_invitation_feedback
-- requires: enum_invitation_feedback_paper

BEGIN;

CREATE TABLE maevsi.invitation (
  id                BIGSERIAL PRIMARY KEY,
  contact_id        BIGINT REFERENCES maevsi.contact(id) NOT NULL,
  event_id          BIGINT REFERENCES maevsi.event(id) NOT NULL,
  feedback          maevsi.invitation_feedback,
  feedback_paper    maevsi.invitation_feedback_paper,
  uuid              UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  UNIQUE (event_id, contact_id)
);

COMMENT ON TABLE maevsi.invitation IS 'An invitation for a contact. A bidirectional mapping between an event and a contact.';
COMMENT ON COLUMN maevsi.invitation.id IS E'@omit create,update\nThe invitations''s internal id.';
COMMENT ON COLUMN maevsi.invitation.contact_id IS 'The contact''s internal id for which the invitation is valid.';
COMMENT ON COLUMN maevsi.invitation.event_id IS 'The event''s internal id for which the invitation is valid.';
COMMENT ON COLUMN maevsi.invitation.feedback IS 'The invitation''s general feedback status.';
COMMENT ON COLUMN maevsi.invitation.feedback_paper IS 'The invitation''s paper feedback status.';
COMMENT ON COLUMN maevsi.invitation.uuid IS E'@omit create,update\nThe invitations''s invitation code.';

-- GRANTs, RLS and POLICYs are specified in 'table_invitation_policy`.

COMMIT;
