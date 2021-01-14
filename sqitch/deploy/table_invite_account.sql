-- Deploy maevsi:table_invite_account to pg
-- requires: schema_public
-- requires: role_account
-- requires: table_event
-- requires: table_account
-- requires: table_invitation_feedback_data
-- requires: function_events_organized

BEGIN;

CREATE TABLE maevsi.invite_account (
  id                        BIGSERIAL PRIMARY KEY,
  uuid                      UUID NOT NULL UNIQUE DEFAULT maevsi.uuid_generate_v1mc(),
  event_id                  BIGINT REFERENCES maevsi.event(id) ON DELETE CASCADE NOT NULL,
  username                  TEXT REFERENCES maevsi_private.account(username) NOT NULL,
  invitation_feedback_id    BIGINT REFERENCES maevsi.invitation_feedback_data(id) NOT NULL,
  UNIQUE (event_id, username)
);

COMMENT ON TABLE maevsi.invite_account IS 'An invite for an account. A bidirectional mapping between an event and an account.';
COMMENT ON COLUMN maevsi.invite_account.uuid IS 'The record''s UUID.';
COMMENT ON COLUMN maevsi.invite_account.event_id IS 'The event''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_account.username IS 'The username for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_account.invitation_feedback_id IS 'The account''s invitation feedback reference.';

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE maevsi.invite_account TO maevsi_account;

ALTER TABLE maevsi.invite_account ENABLE ROW LEVEL SECURITY;

-- Display account invites issued to oneself.
-- Display account invites for events organized by oneself.
CREATE POLICY invite_account_select ON maevsi.invite_account FOR SELECT USING (
      username = current_setting('jwt.claims.username', true)::TEXT
  OR  event_id IN (SELECT maevsi.events_organized())
);

COMMIT;
