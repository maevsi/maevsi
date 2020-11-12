-- Deploy maevsi:table_invite_contact to pg
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: table_event
-- requires: table_contact
-- requires: table_invitation_feedback_data
-- requires: function_invite_claim_array
-- requires: function_events_organized

BEGIN;

CREATE TABLE maevsi.invite_contact (
    id                        BIGSERIAL PRIMARY KEY,
    uuid                      UUID NOT NULL UNIQUE DEFAULT maevsi.uuid_generate_v1mc(),
    event_id                  BIGINT REFERENCES maevsi.event(id) NOT NULL,
    contact_id                BIGINT REFERENCES maevsi.contact(id) NOT NULL,
    invitation_feedback_id    BIGINT REFERENCES maevsi.invitation_feedback_data(id) NOT NULL,
    UNIQUE (event_id, contact_id)
);

COMMENT ON TABLE maevsi.invite_contact IS 'An invite for a contact, i.e. someone without an account. A bidirectional mapping between an event and a contact.';
COMMENT ON COLUMN maevsi.invite_contact.uuid IS 'The record''s UUID.';
COMMENT ON COLUMN maevsi.invite_contact.event_id IS 'The event''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_contact.contact_id IS 'The contact''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_contact.invitation_feedback_id IS 'The contact''s invitation feedback reference.';

GRANT SELECT ON TABLE maevsi.invite_contact TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.invite_contact TO maevsi_account;

ALTER TABLE maevsi.invite_contact ENABLE ROW LEVEL SECURITY;

-- Display contact invites issued to oneself.
-- Display contact invites for events organized by oneself.
CREATE POLICY invite_contact_select ON maevsi.invite_contact FOR SELECT USING (
        uuid = ANY (maevsi.invite_claim_array())
    OR  event_id IN (SELECT maevsi.events_organized())
);

COMMIT;
