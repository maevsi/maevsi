-- Deploy maevsi:function_event_unlock to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact
-- requires: table_event
-- requires: type_event_unlock_response
-- requires: function_invite_claims_to_array
-- requires: type_jwt
-- requires: table_jwt

BEGIN;

CREATE FUNCTION maevsi.event_unlock(
  invitation_code UUID
) RETURNS maevsi.event_unlock_response AS $$
DECLARE
  _jwt_id UUID;
  _jwt maevsi.jwt;
  _event_id BIGINT;
BEGIN
  _jwt_id := current_setting('jwt.claims.id', true)::UUID;
  _jwt := (
    _jwt_id,
    current_setting('jwt.claims.role', true)::TEXT,
    current_setting('jwt.claims.account_id', true)::BIGINT,
    current_setting('jwt.claims.username', true)::TEXT,
    (SELECT ARRAY(SELECT DISTINCT UNNEST(maevsi.invite_claim_array() || $1) ORDER BY 1)),
    current_setting('jwt.claims.exp', true)::BIGINT
  )::maevsi.jwt;

  UPDATE maevsi_private.jwt
  SET token = _jwt
  WHERE uuid = _jwt_id;

  _event_id := (
    SELECT event_id FROM maevsi.invite_contact
    WHERE invite_contact.uuid = $1
  );

  IF (_event_id IS NOT NULL) THEN
    RETURN (SELECT (organizer_username, slug, _jwt)::maevsi.event_unlock_response
    FROM maevsi.event
    WHERE id = _event_id);
  ELSE
      RAISE 'No event for this invitation code found!' USING ERRCODE = 'no_data_found';
  END IF;
END $$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.event_unlock(UUID) IS 'Allows to enter invitation codes.';

GRANT EXECUTE ON FUNCTION maevsi.event_unlock(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
