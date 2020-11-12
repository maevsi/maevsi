-- Deploy maevsi:function_invitee_count to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: table_invite_account
-- requires: table_invite_contact

BEGIN;

CREATE FUNCTION maevsi.invitee_count("event_id" BIGINT)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    (SELECT COUNT(1) FROM maevsi.invite_account WHERE invite_account.event_id = $1)
    +
    (SELECT COUNT(1) FROM maevsi.invite_contact WHERE invite_contact.event_id = $1)
  );
END;
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.invitee_count(BIGINT) IS 'Returns the invitee count for an event.';

GRANT EXECUTE ON FUNCTION maevsi.invitee_count(BIGINT) TO maevsi_account, maevsi_anonymous;

COMMIT;
