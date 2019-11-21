-- Deploy maevsi:table_invite_account to pg
-- requires: schema_public
-- requires: table_event
-- requires: table_account

BEGIN;

CREATE TABLE maevsi.invite_account (
    "id"            UUID PRIMARY KEY DEFAULT maevsi.uuid_generate_v1mc(),
    "event_id"      INTEGER REFERENCES maevsi.event("id") NOT NULL,
    "account_id"    INTEGER REFERENCES maevsi_private.account("contact_id") NOT NULL,
    UNIQUE ("event_id", "account_id")
);

COMMENT ON TABLE maevsi.invite_account IS 'An invite for an account. A bidirectional mapping between an event and an account.';
COMMENT ON COLUMN maevsi.invite_account.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.invite_account.event_id IS 'The event''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_account.account_id IS 'The account''s id for which the invite is valid.';

COMMIT;
