-- Deploy maevsi:table_event_group to pg
-- requires: schema_public
-- requires: table_account
-- requires: enum_event_visibility

BEGIN;

CREATE TABLE maevsi.event_group (
    "id"            SERIAL PRIMARY KEY,
    "name"          TEXT NOT NULL CHECK (char_length("name") < 100),
    "visibility"    event_visibility NOT NULL,
    "organizer_id"  INTEGER REFERENCES maevsi_private.account("contact_id") NOT NULL,
    "archived"      BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE ("organizer_id", "name")
);

COMMENT ON TABLE maevsi.event_group IS 'A group of events.';
COMMENT ON COLUMN maevsi.event_group.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.event_group.name IS 'The event group''s name.';
COMMENT ON COLUMN maevsi.event_group.visibility IS 'The event group''s visibility.';
COMMENT ON COLUMN maevsi.event_group.organizer_id IS 'The id of the event group''s organizer.';
COMMENT ON COLUMN maevsi.event_group.archived IS 'Indicates whether the event group is archived.';

COMMIT;
