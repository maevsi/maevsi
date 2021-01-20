-- Deploy maevsi:function_events_invited to pg
-- requires: privilege_execute_revoke
-- requires: schema_private
-- requires: schema_public
-- requires: table_invitation
-- requires: table_contact
-- requires: role_account
-- requires: role_anonymous
-- requires: role_stomper

BEGIN;

CREATE FUNCTION maevsi_private.events_invited()
RETURNS TABLE (event_id BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT invitation.event_id FROM maevsi.invitation
  WHERE
      invitation.contact_id IN (SELECT id FROM maevsi.contact WHERE contact.account_username = current_setting('jwt.claims.username', true)::TEXT) -- The contact selection does not return rows where account_username "IS" null due to the equality comparison.
  OR  invitation.uuid = ANY (maevsi.invitation_claim_array());
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.events_invited() IS 'Add a function that returns all event ids for which the invoker is invited.';

GRANT EXECUTE ON FUNCTION maevsi_private.events_invited() TO maevsi_account, maevsi_anonymous, maevsi_stomper;

COMMIT;
