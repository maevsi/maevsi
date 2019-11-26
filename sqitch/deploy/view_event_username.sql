-- Deploy maevsi:view_event_username to pg
-- requires: schema_public
-- requires: table_event
-- requires: table_account
-- requires: role_account
-- requires: role_anonymous

BEGIN;

CREATE VIEW maevsi.events_with_username AS
    SELECT * FROM maevsi.event
    JOIN (SELECT contact_id AS organizer_id, username FROM maevsi_private.account) account USING (organizer_id);

COMMENT ON VIEW maevsi.events_with_username IS 'Shows all events, but adds the organizer''s username as column.';
COMMENT ON COLUMN maevsi.events_with_username.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.events_with_username.name IS 'The event''s name.';
COMMENT ON COLUMN maevsi.events_with_username.slug IS 'The event''s name, slugified.';
COMMENT ON COLUMN maevsi.events_with_username.visibility IS 'The event''s visibility.';
COMMENT ON COLUMN maevsi.events_with_username.organizer_id IS 'The id of the event''s organizer.';
COMMENT ON COLUMN maevsi.events_with_username.place IS 'The event''s place as it can be shown on a map.';
COMMENT ON COLUMN maevsi.events_with_username.timestamp IS 'The event''s date and time, with timezone.';
COMMENT ON COLUMN maevsi.events_with_username.interval IS 'The event''s duration.';
COMMENT ON COLUMN maevsi.events_with_username.archived IS 'Indicates whether the event is archived.';
COMMENT ON COLUMN maevsi.events_with_username.username IS 'The account''s username.';

GRANT SELECT ON maevsi.events_with_username TO maevsi_account, maevsi_anonymous;

COMMIT;
