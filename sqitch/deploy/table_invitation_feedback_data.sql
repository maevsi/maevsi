-- Deploy maevsi:table_invitation_feedback_data to pg
-- requires: schema_public
-- requires: enum_invitation_feedback
-- requires: enum_invitation_feedback_paper
-- requires: function_invite_feedback_ids

BEGIN;

CREATE TABLE maevsi.invitation_feedback_data (
    id                           BIGSERIAL PRIMARY KEY,
    invitation_feedback          maevsi.invitation_feedback,
    paper_invitation_feedback    maevsi.invitation_feedback_paper
);

COMMENT ON TABLE maevsi.invitation_feedback_data IS 'Includes invitation feedback data.';
COMMENT ON COLUMN maevsi.invitation_feedback_data.id IS 'The record''s UUID.';
COMMENT ON COLUMN maevsi.invitation_feedback_data.invitation_feedback IS 'The invitation feedback''s general status. Null, accepted or canceled';
COMMENT ON COLUMN maevsi.invitation_feedback_data.paper_invitation_feedback IS 'The invitation feedback''s paper feedback status. Null, paper or digital.';

GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE maevsi.invitation_feedback_data TO maevsi_account;
GRANT SELECT, UPDATE ON TABLE maevsi.invitation_feedback_data TO maevsi_anonymous;

ALTER TABLE maevsi.invitation_feedback_data ENABLE ROW LEVEL SECURITY;

-- Display invitation feedback data for accessible account or contact invitations.
CREATE POLICY invitation_feedback_data_select ON maevsi.invitation_feedback_data FOR SELECT USING (
    id IN (SELECT maevsi_private.invite_feedback_ids())
);
CREATE POLICY invitation_feedback_data_update ON maevsi.invitation_feedback_data FOR UPDATE USING (
    id IN (SELECT maevsi_private.invite_feedback_ids())
);

COMMIT;
