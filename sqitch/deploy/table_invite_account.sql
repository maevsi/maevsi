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
    event_id                  INTEGER REFERENCES maevsi.event(id) NOT NULL,
    account_id                INTEGER REFERENCES maevsi_private.account(id) NOT NULL,
    invitation_feedback_id    INTEGER REFERENCES maevsi.invitation_feedback_data(id) NOT NULL,
    UNIQUE (event_id, account_id)
);

COMMENT ON TABLE maevsi.invite_account IS 'An invite for an account. A bidirectional mapping between an event and an account.';
COMMENT ON COLUMN maevsi.invite_account.uuid IS 'The record''s UUID.';
COMMENT ON COLUMN maevsi.invite_account.event_id IS 'The event''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_account.account_id IS 'The account''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_account.invitation_feedback_id IS 'The account''s invitation feedback reference.';

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE maevsi.invite_account TO maevsi_account;

ALTER TABLE maevsi.invite_account ENABLE ROW LEVEL SECURITY;

-- Display account invites issued to oneself.
-- Display account invites for events organized by oneself.
CREATE POLICY invite_account_select ON maevsi.invite_account FOR SELECT USING (
        account_id = current_setting('jwt.claims.account_id', true)::INTEGER
    OR  event_id IN (SELECT maevsi.events_organized())
);

COMMIT;
