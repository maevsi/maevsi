-- Deploy maevsi:function_invites to pg
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact

BEGIN;

CREATE FUNCTION maevsi_private.events_invited() RETURNS TABLE (event_id INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT invite_account.event_id FROM maevsi.invite_account
    WHERE invite_account.account_id = current_setting('jwt.claims.account_id', true)::integer
    UNION ALL
    SELECT invite_contact.event_id FROM maevsi.invite_contact
    WHERE invite_contact.contact_id = current_setting('jwt.claims.account_id', true)::integer;
END
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.events_invited() IS 'Add a function that returns all event ids for which the invoker is invited.';

GRANT EXECUTE ON FUNCTION maevsi_private.events_invited() TO maevsi_account, maevsi_anonymous;

COMMIT;
