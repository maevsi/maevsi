-- Deploy maevsi:table_event to pg
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: table_account
-- requires: enum_event_visibility

BEGIN;

CREATE TABLE maevsi.event (
    "id"            SERIAL PRIMARY KEY,
    "name"          TEXT NOT NULL CHECK (char_length("name") < 100),
    "visibility"    maevsi.event_visibility NOT NULL,
    "organizer_id"  INTEGER REFERENCES maevsi_private.account("contact_id") NOT NULL,
    "place"         TEXT CHECK (char_length("place") < 300),
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

GRANT SELECT ON TABLE maevsi.event TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.event TO maevsi_account;

GRANT USAGE ON SEQUENCE maevsi.event_id_seq TO maevsi_account;

ALTER TABLE maevsi.event ENABLE ROW LEVEL SECURITY;

CREATE POLICY event_select ON maevsi.event FOR SELECT USING (
        organizer_id = current_setting('jwt.claims.account_id', true)::integer
    OR  id IN (SELECT maevsi_private.events_invited())
);

COMMIT;
