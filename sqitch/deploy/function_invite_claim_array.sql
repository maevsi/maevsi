-- Deploy maevsi:function_invite_claim_array to pg
-- requires: privilege_execute_revoke
-- requires: schema_public

BEGIN;

CREATE FUNCTION maevsi.invite_claim_array() RETURNS UUID[] AS $$
BEGIN
  RETURN string_to_array(replace(btrim(current_setting('jwt.claims.invites', true), '[]'), '"', ''), ',')::UUID[];
END
$$ LANGUAGE PLPGSQL STRICT STABLE;

COMMENT ON FUNCTION maevsi.invite_claim_array() IS 'Returns the current invite clains as UUID array.';

GRANT EXECUTE ON FUNCTION maevsi.invite_claim_array() TO maevsi_account, maevsi_anonymous;

COMMIT;
