-- Deploy maevsi:function_invites to pg
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact

BEGIN;

CREATE FUNCTION maevsi_private.events_organized() RETURNS TABLE (event_id INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT id FROM maevsi.event
    WHERE event.organizer_id = current_setting('jwt.claims.account_id', true)::integer;
END
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.events_organized() IS 'Add a function that returns all event ids for which the invoker is the organizer.';

GRANT EXECUTE ON FUNCTION maevsi_private.events_organized() TO maevsi_account, maevsi_anonymous;

COMMIT;
