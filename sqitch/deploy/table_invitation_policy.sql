-- Deploy maevsi:table_invitation_policy to pg
-- requires: schema_public
-- requires: table_invitation
-- requires: role_account
-- requires: role_anonymous
-- requires: function_invitation_claim_array
-- requires: function_events_organized
-- requires: function_event_invitee_count_maximum

BEGIN;

GRANT SELECT ON TABLE maevsi.invitation TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.invitation TO maevsi_account;

GRANT USAGE ON SEQUENCE maevsi.invitation_id_seq TO maevsi_account;

ALTER TABLE maevsi.invitation ENABLE ROW LEVEL SECURITY;

-- Only display invitations issued to oneself through invitation claims.
-- Only display invitations issued to oneself through the account.
-- Only display invitations to events organized by oneself.
CREATE POLICY invitation_select ON maevsi.invitation FOR SELECT USING (
      uuid = ANY (maevsi.invitation_claim_array())
  OR  contact_id IN (SELECT id FROM maevsi.contact WHERE contact.account_username = current_setting('jwt.claims.username', true)::TEXT)
  OR  event_id IN (SELECT maevsi.events_organized())
);

-- Only allow inserts for invitations to events organized by oneself.
-- Only allow inserts for invitations to events for which the maximum invitee count is not yet reached.
CREATE POLICY invitation_insert ON maevsi.invitation FOR INSERT WITH CHECK (
      event_id IN (SELECT maevsi.events_organized())
  AND maevsi.event_invitee_count_maximum(event_id) > maevsi.invitee_count(event_id)
);

-- Only allow updates to invitations to events organized by oneself.
CREATE POLICY invitation_update ON maevsi.invitation FOR UPDATE USING (
  event_id IN (SELECT maevsi.events_organized())
);

-- Only allow deletes for invitations to events organized by oneself.
CREATE POLICY invitation_delete ON maevsi.invitation FOR DELETE USING (
  event_id IN (SELECT maevsi.events_organized())
);

COMMIT;
