-- Deploy maevsi:function_events_invited to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact
-- requires: function_invite_claims_to_array

BEGIN;

CREATE FUNCTION maevsi_private.events_invited() RETURNS TABLE (event_id BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT invite_account.event_id FROM maevsi.invite_account
  WHERE invite_account.username = COALESCE(NULLIF(current_setting('jwt.claims.username', true), ''), '0')::TEXT
  UNION ALL
  SELECT invite_contact.event_id FROM maevsi.invite_contact
  WHERE invite_contact.uuid = ANY (maevsi.invite_claim_array());
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.events_invited() IS 'Add a function that returns all event ids for which the invoker is invited.';

GRANT EXECUTE ON FUNCTION maevsi_private.events_invited() TO maevsi_account, maevsi_anonymous;

COMMIT;
