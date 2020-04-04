-- Deploy maevsi:function_jwt_refresh to pg
-- requires: schema_public
-- requires: type_jwt
-- requires: table_jwt

BEGIN;

CREATE FUNCTION maevsi.jwt_refresh(
    "jwt_id" UUID
) RETURNS maevsi.jwt AS $$
DECLARE
  "_jwt" maevsi.jwt;
BEGIN
    SELECT INTO "_jwt"
    FROM maevsi_private.jwt
    WHERE   "id" = "jwt_id"
    AND     "valid_until" >= NOW();

    IF EXISTS "_jwt"
    THEN
        UPDATE maevsi_private.jwt
        SET "valid_until" = DEFAULT
        WHERE "id" = "jwt_id";

        RETURN (
            SELECT "token"
            FROM maevsi_private.jwt
            WHERE   "id" = "jwt_id"
            AND     "valid_until" >= NOW()
        );
    END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.jwt_refresh(UUID) IS 'Refreshes a JWT.';

GRANT EXECUTE ON FUNCTION maevsi.jwt_refresh(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
