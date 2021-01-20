-- Deploy maevsi:function_invitation_contact_ids to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: table_invitation
-- requires: function_invitation_claim_array
-- requires: function_events_organized
-- requires: role_account
-- requires: role_anonymous
-- requires: role_stomper

BEGIN;

CREATE FUNCTION maevsi.invitation_contact_ids()
RETURNS TABLE (contact_id BIGINT) AS $$
BEGIN
  RETURN QUERY
    SELECT invitation.contact_id FROM maevsi.invitation
    WHERE uuid = ANY (maevsi.invitation_claim_array())
    OR    event_id IN (SELECT maevsi.events_organized());
END;
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.invitation_contact_ids() IS 'Returns contact ids that are accessible through invitations.';

GRANT EXECUTE ON FUNCTION maevsi.invitation_contact_ids() TO maevsi_account, maevsi_anonymous, maevsi_stomper;

COMMIT;
