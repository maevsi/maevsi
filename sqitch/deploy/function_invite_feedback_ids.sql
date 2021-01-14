-- Deploy maevsi:function_invite_feedback_ids to pg
-- requires: privilege_execute_revoke
-- requires: schema_private

BEGIN;

CREATE FUNCTION maevsi_private.invite_feedback_ids() RETURNS TABLE (invitation_feedback_id BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT invite_account.invitation_feedback_id FROM maevsi.invite_account
    WHERE   invite_account.username = current_setting('jwt.claims.username', true)::TEXT
      OR  invite_account.event_id IN (SELECT maevsi.events_organized())
  UNION ALL
  SELECT invite_contact.invitation_feedback_id FROM maevsi.invite_contact
    WHERE   invite_contact.uuid = ANY (maevsi.invite_claim_array())
      OR  invite_contact.event_id IN (SELECT maevsi.events_organized());
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.invite_feedback_ids() IS 'Returns all accessible invitation feedback ids.';

GRANT EXECUTE ON FUNCTION maevsi_private.invite_feedback_ids() TO maevsi_account, maevsi_anonymous;

COMMIT;
