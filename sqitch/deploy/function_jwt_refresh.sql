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
    SELECT (token)."id", (token)."role", (token)."account_id", (token)."username", (token)."invites" INTO "_jwt"
    FROM maevsi_private.jwt
    WHERE   "id" = $1
    AND     "valid_until" >= NOW();

    IF NOT "_jwt" IS NULL
    THEN
        UPDATE maevsi_private.jwt
        SET "valid_until" = DEFAULT
        WHERE "id" = $1;

        RETURN (
            SELECT "token"
            FROM maevsi_private.jwt
            WHERE   "id" = $1
            AND     "valid_until" >= NOW()
        );
    ELSE
        RETURN NULL;
    END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.jwt_refresh(UUID) IS 'Refreshes a JWT.';

GRANT EXECUTE ON FUNCTION maevsi.jwt_refresh(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
