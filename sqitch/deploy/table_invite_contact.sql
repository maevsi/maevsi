-- Deploy maevsi:table_invite_contact to pg
-- requires: schema_public
-- requires: role_account
-- requires: table_event
-- requires: table_contact

BEGIN;

CREATE TABLE maevsi.invite_contact (
    "id"            UUID PRIMARY KEY DEFAULT maevsi.uuid_generate_v1mc(),
    "event_id"      INTEGER REFERENCES maevsi.event("id") NOT NULL,
    "contact_id"    INTEGER REFERENCES maevsi.contact("id") NOT NULL,
    UNIQUE ("event_id", "contact_id")
);

COMMENT ON TABLE maevsi.invite_contact IS 'An invite for a contact, i.e. someone without an account. A bidirectional mapping between an event and a contact.';
COMMENT ON COLUMN maevsi.invite_contact.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.invite_contact.event_id IS 'The event''s id for which the invite is valid.';
COMMENT ON COLUMN maevsi.invite_contact.contact_id IS 'The contact''s id for which the invite is valid.';

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE maevsi.invite_contact TO maevsi_account;

ALTER TABLE maevsi.invite_contact ENABLE ROW LEVEL SECURITY;

CREATE POLICY invite_contact_select ON maevsi.invite_contact FOR SELECT USING (
        contact_id = current_setting('jwt.claims.account_id', true)::integer
);

COMMIT;
