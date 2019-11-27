-- Deploy maevsi:function_redeem to pg
-- requires: schema_public
-- requires: table_invite_account
-- requires: table_invite_contact
-- requires: table_event
-- requires: type_redeem_response

BEGIN;

CREATE FUNCTION maevsi.redeem(
    "invitation_code" UUID
) RETURNS maevsi.redeem_response AS $$
    SELECT  "organizer_username",
            "slug" AS "event_slug",
            ('maevsi_anonymous', NULL, NULL, (SELECT ARRAY(SELECT DISTINCT UNNEST(string_to_array(replace(btrim(current_setting('jwt.claims.invites', true), '[]'), '"', ''), ',')::UUID[] || "invitation_code") ORDER BY 1)))::maevsi.jwt
    FROM maevsi.event
    WHERE id = (
        SELECT event_id FROM maevsi.invite_contact
        WHERE invite_contact.uuid = "invitation_code"
    )
$$ LANGUAGE SQL STABLE STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.redeem(UUID) IS 'Allows to redeem invitation codes.';

GRANT EXECUTE ON FUNCTION maevsi.redeem(UUID) TO maevsi_account, maevsi_anonymous;

COMMIT;
