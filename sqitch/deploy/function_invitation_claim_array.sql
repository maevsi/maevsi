-- Deploy maevsi:function_invitation_claim_array to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: role_stomper

BEGIN;

CREATE FUNCTION maevsi.invitation_claim_array()
RETURNS UUID[] AS $$
BEGIN
  RETURN string_to_array(replace(btrim(current_setting('jwt.claims.invitations', true), '[]'), '"', ''), ',')::UUID[];
END
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY INVOKER;

COMMENT ON FUNCTION maevsi.invitation_claim_array() IS 'Returns the current invitation claims as UUID array.';

GRANT EXECUTE ON FUNCTION maevsi.invitation_claim_array() TO maevsi_account, maevsi_anonymous, maevsi_stomper;

COMMIT;
