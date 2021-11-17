-- Deploy maevsi:table_event_policy to pg
-- requires: schema_public
-- requires: table_event
-- requires: role_account
-- requires: role_anonymous
-- requires: schema_private
-- requires: function_events_invited

BEGIN;

GRANT SELECT ON TABLE maevsi.event TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.event TO maevsi_account;

GRANT USAGE ON SEQUENCE maevsi.event_id_seq TO maevsi_account;

ALTER TABLE maevsi.event ENABLE ROW LEVEL SECURITY;

-- Only display events that are public and not full.
-- Only display events that are organized by oneself.
-- Only display events to which oneself is invited.
CREATE POLICY event_select ON maevsi.event FOR SELECT USING (
-- Below copied to function `maevsi.event_invitee_count_maximum`.
      (
        visibility = 'public'
        AND
        (
          invitee_count_maximum IS NULL
          OR
          invitee_count_maximum > (maevsi.invitee_count(id)) -- Using the function here is required as there would otherwise be infinite recursion.
        )
      )
  OR  author_username = current_setting('jwt.claims.username', true)::TEXT
  OR  id IN (SELECT maevsi_private.events_invited())
);

-- Only allow inserts for events authored by the current user.
CREATE POLICY event_insert ON maevsi.event FOR INSERT WITH CHECK (
  author_username = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow updates for events authored by the current user.
CREATE POLICY event_update ON maevsi.event FOR UPDATE USING (
  author_username = current_setting('jwt.claims.username', true)::TEXT
);

COMMIT;
