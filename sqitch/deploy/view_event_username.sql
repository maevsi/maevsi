-- Deploy maevsi:view_event_username to pg
-- requires: schema_public
-- requires: table_event
-- requires: table_account
-- requires: role_account
-- requires: role_anonymous

BEGIN;

CREATE VIEW maevsi.all_events_with_username AS
    SELECT * FROM maevsi.event
    JOIN (SELECT contact_id AS organizer_id, username FROM maevsi_private.account) account USING (organizer_id);

COMMENT ON VIEW maevsi.all_events_with_username IS 'Shows all events, but adds the organizer''s username as column.';

GRANT SELECT ON maevsi.all_events_with_username TO maevsi_account, maevsi_anonymous;

COMMIT;
