-- Deploy maevsi:function_invites_contact to pg
-- requires: privilege_execute_revoke
-- requires: schema_private
-- requires: function_invite_claim_array
-- requires: function_events_organized

BEGIN;

CREATE FUNCTION maevsi_private.invites_contact() RETURNS TABLE (contact_id INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT invite_contact.contact_id FROM maevsi.invite_contact
    WHERE   uuid = ANY (maevsi.invite_claim_array())
        OR  event_id IN (SELECT maevsi.events_organized());
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.invites_contact() IS 'Displays the same values as a SELECT on the invite_contact table. Used as prevention for a circular dependency.';

GRANT EXECUTE ON FUNCTION maevsi_private.invites_contact() TO maevsi_account, maevsi_anonymous;

COMMIT;
