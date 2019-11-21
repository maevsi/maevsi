-- Deploy maevsi:table_invite_contact to pg
-- requires: schema_public
-- requires: table_event
-- requires: table_contact

BEGIN;

CREATE TABLE maevsi.invite_contact (
    "id"            UUID PRIMARY KEY DEFAULT uuid_generate_v1mc(),
    "event_id"      INTEGER REFERENCES maevsi.event("id") NOT NULL,
    "contact_id"    INTEGER REFERENCES maevsi.contact("id") NOT NULL,
    UNIQUE ("event_id", "contact_id")
);

COMMENT ON TABLE maevsi.invite_contact IS 'An invite for a contact, i.e. someone without an account.';
COMMENT ON COLUMN maevsi.invite_contact.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.invite_contact.event_id IS 'The event''s id.';
COMMENT ON COLUMN maevsi.invite_contact.contact_id IS 'The contact''s id.';

COMMIT;
