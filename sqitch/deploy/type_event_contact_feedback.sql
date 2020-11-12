-- Deploy maevsi:type_event_contact_feedback to pg
-- requires: schema_public
-- requires: table_event
-- requires: table_contact
-- requires: table_invitation_feedback_data

BEGIN;

CREATE TYPE maevsi.event_contact_feedback AS (
  event maevsi.event,
  contact maevsi.contact,
  invitation_feedback_data maevsi.invitation_feedback_data
);

COMMIT;
