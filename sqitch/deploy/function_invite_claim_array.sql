-- Deploy maevsi:function_invite_claim_array to pg
-- requires: schema_private

BEGIN;

CREATE FUNCTION maevsi_private.invite_claim_array() RETURNS UUID[] AS $$
BEGIN
    RETURN string_to_array(replace(btrim(current_setting('jwt.claims.invites', true), '[]'), '"', ''), ',')::UUID[];
END
$$ LANGUAGE PLPGSQL STRICT;

COMMENT ON FUNCTION maevsi_private.invite_claim_array() IS 'Returns the current invite clains as UUID array.';

GRANT EXECUTE ON FUNCTION maevsi_private.invite_claim_array() TO maevsi_anonymous;

COMMIT;
