-- Deploy maevsi:function_redeem to pg
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact
-- requires: table_event
-- requires: type_redeem_response
-- requires: function_invite_claims_to_array

BEGIN;

CREATE FUNCTION maevsi.redeem(
    "invitation_code" UUID
) RETURNS maevsi.redeem_response AS $$
    SELECT  "organizer_username",
            "slug" AS "event_slug",
            (
                'maevsi_anonymous',
                NULL,
                NULL,
               (SELECT ARRAY(SELECT DISTINCT UNNEST(maevsi.invite_claim_array() || "invitation_code") ORDER BY 1))
            )::maevsi.jwt
    FROM maevsi.event
    WHERE id = (
        SELECT event_id FROM maevsi.invite_contact
        WHERE invite_contact.uuid = "invitation_code"
    )
$$ LANGUAGE SQL STABLE STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.redeem(UUID) IS 'Allows to redeem invitation codes.';

GRANT EXECUTE ON FUNCTION maevsi.redeem(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
