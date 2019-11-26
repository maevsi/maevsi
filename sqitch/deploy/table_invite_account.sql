-- Deploy maevsi:table_invite_account to pg
-- requires: schema_public
-- requires: role_account
-- requires: table_event
-- requires: table_account

BEGIN;

CREATE TABLE maevsi.invite_account (
    "uuid"      UUID PRIMARY KEY DEFAULT maevsi.uuid_generate_v1mc(),
    "event_id"  INTEGER REFERENCES maevsi.event("id") NOT NULL,
    "username"  TEXT REFERENCES maevsi_private.account("username") NOT NULL,
    UNIQUE ("event_id", "username")
);

COMMENT ON TABLE maevsi.invite_account IS 'An invite for an account. A bidirectional mapping between an event and an account.';
COMMENT ON COLUMN maevsi.invite_account.uuid IS 'The record''s UUID.';
COMMENT ON COLUMN maevsi.invite_account.event_id IS 'The event''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_account.username IS 'The account''s id for which the invite is valid.';

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE maevsi.invite_account TO maevsi_account;

ALTER TABLE maevsi.invite_account ENABLE ROW LEVEL SECURITY;

-- Display account invites issued to oneself.
-- Display account invites for events organized by oneself.
CREATE POLICY invite_account_select ON maevsi.invite_account FOR SELECT USING (
        username = current_setting('jwt.claims.username', true)::TEXT
    OR  event_id IN (SELECT maevsi_private.events_organized())
);

COMMIT;
