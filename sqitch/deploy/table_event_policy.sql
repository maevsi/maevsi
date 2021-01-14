-- Deploy maevsi:table_event_policy to pg
-- requires: schema_public
-- requires: table_event
-- requires: function_invitee_count
-- requires: schema_private
-- requires: function_events_invited

BEGIN;

ALTER TABLE maevsi.event ENABLE ROW LEVEL SECURITY;

-- Display events that are public and not full.
-- Display events that are organized by oneself.
-- Display events to which oneself is invited.
CREATE POLICY event_select ON maevsi.event FOR SELECT USING (
      (
        visibility = 'public'
        AND
        (
          invitee_count_maximum IS NULL
          OR
          maevsi.invitee_count(id) < invitee_count_maximum
        )
      )
  OR  organizer_username = current_setting('jwt.claims.username', true)::TEXT
  OR  id IN (SELECT maevsi_private.events_invited())
);

CREATE POLICY event_insert ON maevsi.event FOR INSERT WITH CHECK (
    organizer_username = current_setting('jwt.claims.username', true)::TEXT
);

COMMIT;
