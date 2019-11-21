-- Deploy maevsi:table_event to pg
-- requires: schema_public
-- requires: table_account
-- requires: enum_event_visibility

BEGIN;

CREATE TABLE maevsi.event (
    "id"            SERIAL PRIMARY KEY,
    "name"          TEXT CHECK (char_length("name") < 100),
    "visibility"    event_visibility NOT NULL,
    "organizer_id"  INTEGER REFERENCES maevsi_private.account("id") NOT NULL,
    "place"         TEXT NOT NULL CHECK (char_length("place") < 300),
    "timestamp"     TIMESTAMP WITH TIME ZONE NOT NULL,
    "interval"      INTERVAL,
    "archived"      BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE ("organizer_id", "name")
);

COMMENT ON TABLE maevsi.event IS 'An event.';
COMMENT ON COLUMN maevsi.event.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.event.name IS 'The event''s name.';
COMMENT ON COLUMN maevsi.event.visibility IS 'The event''s visibility.';
COMMENT ON COLUMN maevsi.event.organizer_id IS 'The id of the event''s organizer.';
COMMENT ON COLUMN maevsi.event.place IS 'The event''s place as it can be shown on a map.';
COMMENT ON COLUMN maevsi.event.timestamp IS 'The event''s date and time, with timezone.';
COMMENT ON COLUMN maevsi.event.interval IS 'The event''s duration.';
COMMENT ON COLUMN maevsi.event.archived IS 'Indicates whether the event is archived.';

COMMIT;
