-- Deploy maevsi:function_invites to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact
-- requires: function_invite_claims_to_array

BEGIN;

CREATE FUNCTION maevsi_private.events_invited() RETURNS TABLE (event_id INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT invite_account.event_id FROM maevsi.invite_account
    WHERE invite_account.account_id = COALESCE(NULLIF(current_setting('jwt.claims.account_id', true), ''), '0')::INTEGER
    UNION ALL
    SELECT invite_contact.event_id FROM maevsi.invite_contact
    WHERE invite_contact.uuid = ANY (maevsi.invite_claim_array());
END
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.events_invited() IS 'Add a function that returns all event ids for which the invoker is invited.';

GRANT EXECUTE ON FUNCTION maevsi_private.events_invited() TO maevsi_account, maevsi_anonymous;

COMMIT;
