-- Deploy maevsi:function_event_invitee_count_maximum to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: table_event
-- requires: function_invitee_count
-- requires: schema_private
-- requires: function_events_invited
-- requires: role_account
-- requires: role_anonymous

BEGIN;

CREATE FUNCTION maevsi.event_invitee_count_maximum(event_id BIGINT) RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT "event".invitee_count_maximum
    FROM maevsi.event
    WHERE
      "event".id = $1
      AND ( -- Copied from `event_select` POLICY.
            (
              "event".visibility = 'public'
              AND
              (
                "event".invitee_count_maximum IS NULL
                OR
                "event".invitee_count_maximum > (maevsi.invitee_count(id)) -- Using the function here is required as there would otherwise be infinite recursion.
              )
            )
        OR  "event".organizer_username = current_setting('jwt.claims.username', true)::TEXT
        OR  "event".id IN (SELECT maevsi_private.events_invited())
      )
  );
END
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.event_invitee_count_maximum(BIGINT) IS 'Add a function that returns the maximum invitee count of an accessible event.';

GRANT EXECUTE ON FUNCTION maevsi.event_invitee_count_maximum(BIGINT) TO maevsi_account, maevsi_anonymous;

COMMIT;
