-- Deploy maevsi:function_jwt_refresh to pg
-- requires: privilege_execute_revoke
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

    IF "_jwt" IS NULL
    THEN
        RETURN NULL;
    ELSE
        UPDATE maevsi_private.jwt
        SET "valid_until" = DEFAULT
        WHERE "id" = $1;

        UPDATE maevsi_private.account
        SET "last_activity" = DEFAULT
        WHERE account."username" = "_jwt"."username";

        RETURN (
            SELECT "token"
            FROM maevsi_private.jwt
            WHERE   "id" = $1
            AND     "valid_until" >= NOW()
        );
    END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.jwt_refresh(UUID) IS 'Refreshes a JWT.';

GRANT EXECUTE ON FUNCTION maevsi.jwt_refresh(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
