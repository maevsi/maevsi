-- Deploy maevsi:function_event_contact_feedback_data to pg
-- requires: schema_public
-- requires: table_event
-- requires: table_contact
-- requires: table_invite_account
-- requires: table_invite_contact
-- requires: type_event_with_contact

BEGIN;

CREATE FUNCTION maevsi.event_contact_feedback_data(
    "_organizer_username" TEXT,
    "_slug" TEXT
) RETURNS maevsi.event_contact_feedback AS $$
DECLARE
    "_event" maevsi.event;
    "_invite_account" maevsi.invite_account;
    "_invite_contact" maevsi.invite_contact;
    "_contact" maevsi.contact;
    "_invitation_feedback_data" maevsi.invitation_feedback_data;
BEGIN
    SELECT * INTO _event FROM maevsi.event
        WHERE event.organizer_username = _organizer_username
          AND event.slug = _slug;

    IF (current_setting('jwt.claims.role', true)::TEXT = 'maevsi_account') THEN
        SELECT * INTO _invite_account FROM maevsi.invite_account
            WHERE   invite_account.event_id = _event.id
            AND     invite_account.account_id = current_setting('jwt.claims.account_id', true)::INTEGER;

        SELECT * INTO _contact FROM maevsi.contact
            WHERE contact.id = _invite_account.account_id;

        SELECT * INTO _invitation_feedback_data FROM maevsi.invitation_feedback_data
            WHERE invitation_feedback_data.id = _invite_account.invitation_feedback_id;
    ELSIF (current_setting('jwt.claims.role', true)::TEXT = 'maevsi_anonymous') THEN
        SELECT * INTO _invite_contact FROM maevsi.invite_contact
            WHERE   invite_contact.event_id = _event.id
            AND     invite_contact.uuid = ANY (maevsi.invite_claim_array());

        SELECT * INTO _contact FROM maevsi.contact
            WHERE contact.id = _invite_contact.contact_id;

        SELECT * INTO _invitation_feedback_data FROM maevsi.invitation_feedback_data
            WHERE invitation_feedback_data.id = _invite_contact.invitation_feedback_id;
    END IF;

    RETURN (_event, _contact, _invitation_feedback_data);
END
$$ LANGUAGE PLPGSQL STRICT STABLE;

COMMENT ON FUNCTION maevsi.event_contact_feedback_data(TEXT, TEXT) IS 'Returns the event as indicated by the event organizer''s username and event slug together with the accessing contact and its feedback data.';

GRANT EXECUTE ON FUNCTION maevsi.event_contact_feedback_data(TEXT, TEXT) TO maevsi_account, maevsi_anonymous;

COMMIT;
