-- Deploy maevsi:table_invite_contact to pg
-- requires: schema_public
-- requires: role_account
-- requires: table_event
-- requires: table_contact
-- requires: enum_invitation_feedback
-- requires: enum_invitation_feedback_paper
-- requires: function_invite_claims_to_array

BEGIN;

CREATE TABLE maevsi.invite_contact (
    "uuid"          UUID PRIMARY KEY DEFAULT maevsi.uuid_generate_v1mc(),
    "event_id"      INTEGER REFERENCES maevsi.event("id") NOT NULL,
    "contact_id"    INTEGER REFERENCES maevsi.contact("id") NOT NULL,
    -- columns below are here temporarily and will be extracted later
    "invitation_feedback"   maevsi.invitation_feedback,
    "paper_invitation_feedback"   maevsi.invitation_feedback_paper,
    UNIQUE ("event_id", "contact_id")
);

COMMENT ON TABLE maevsi.invite_contact IS 'An invite for a contact, i.e. someone without an account. A bidirectional mapping between an event and a contact.';
COMMENT ON COLUMN maevsi.invite_contact.uuid IS 'The record''s UUID.';
COMMENT ON COLUMN maevsi.invite_contact.event_id IS 'The event''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_contact.contact_id IS 'The contact''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_contact.invitation_feedback IS 'The invitee''s feedback for the invitation. Null, accepted or canceled.';
COMMENT ON COLUMN maevsi.invite_contact.paper_invitation_feedback IS 'The invitee''s choice on how to receive a paper invitation. Null, paper or digital.';

GRANT SELECT ON TABLE maevsi.invite_contact TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.invite_contact TO maevsi_account;

ALTER TABLE maevsi.invite_contact ENABLE ROW LEVEL SECURITY;

-- TODO: Display contact invites issued to oneself.
-- Display contact invites for events organized by oneself.
CREATE POLICY invite_contact_select ON maevsi.invite_contact FOR SELECT USING (
        uuid = ANY (maevsi_private.invite_claim_array())
    OR  event_id IN (SELECT maevsi_private.events_organized())
);

COMMIT;
