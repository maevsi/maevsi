-- Deploy maevsi:function_account_delete to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: schema_private
-- requires: table_notification
-- requires: role_account

BEGIN;

CREATE FUNCTION maevsi.invite(
  invitation_id BIGINT
) RETURNS VOID AS $$
DECLARE
  _event_id BIGINT;
BEGIN
  _event_id = (SELECT event_id FROM maevsi.invitation WHERE invitation.id = $1);

  IF (_event_id IS NULL OR _event_id NOT IN (SELECT maevsi.events_organized())) THEN
    RAISE 'Invitation not accessible!' USING ERRCODE = 'no_data_found';
  END IF;

  INSERT INTO maevsi_private.notification (channel, payload)
    VALUES (
      'invitation',
      '{ "invitation_id": ' || $1 || ' }'
    );
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.invite(BIGINT) IS 'Adds a notification for the invitation channel.';

GRANT EXECUTE ON FUNCTION maevsi.invite(BIGINT) TO maevsi_account;

COMMIT;
