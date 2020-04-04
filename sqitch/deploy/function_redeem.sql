-- Deploy maevsi:function_redeem to pg
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact
-- requires: table_event
-- requires: type_redeem_response
-- requires: function_invite_claims_to_array
-- requires: type_jwt
-- requires: table_jwt

BEGIN;

CREATE FUNCTION maevsi.redeem(
    "invitation_code" UUID
) RETURNS maevsi.redeem_response AS $$
DECLARE
    "_jwt_id" UUID;
    "_jwt" maevsi.jwt;
    "_event_id" INTEGER;
BEGIN
    "_jwt_id" := current_setting('jwt.claims.id', true)::UUID;
    "_jwt" := (
        "_jwt_id",
        current_setting('jwt.claims.role', true)::TEXT,
        current_setting('jwt.claims.account_id', true)::INTEGER,
        current_setting('jwt.claims.username', true)::TEXT,
        (SELECT ARRAY(SELECT DISTINCT UNNEST(maevsi.invite_claim_array() || "invitation_code") ORDER BY 1))
    )::maevsi.jwt;

    UPDATE maevsi_private.jwt
    SET "token" = "_jwt"
    WHERE "id" = "_jwt_id";

    "_event_id" := (
        SELECT event_id FROM maevsi.invite_contact
        WHERE invite_contact.uuid = "invitation_code"
    );

    IF "_event_id" IS NOT NULL
    THEN
        RETURN (SELECT  "organizer_username",
                "slug" AS "event_slug",
                "_jwt"
        FROM maevsi.event
        WHERE id = (
            "_event_id"
        ));
    ELSE
        RAISE 'No event for this invitation code found!' USING ERRCODE = 'no_data_found';
    END IF;
END $$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.redeem(UUID) IS 'Allows to redeem invitation codes.';

GRANT EXECUTE ON FUNCTION maevsi.redeem(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
