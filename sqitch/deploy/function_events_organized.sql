-- Deploy maevsi:function_invites to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact

BEGIN;

CREATE FUNCTION maevsi.events_organized() RETURNS TABLE (event_id BIGINT) AS $$
BEGIN
    RETURN QUERY
    SELECT id FROM maevsi.event
    WHERE event.organizer_username = current_setting('jwt.claims.username', true)::TEXT;
END
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.events_organized() IS 'Add a function that returns all event ids for which the invoker is the organizer.';

GRANT EXECUTE ON FUNCTION maevsi.events_organized() TO maevsi_account, maevsi_anonymous;

COMMIT;
