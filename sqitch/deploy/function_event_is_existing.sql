-- Deploy maevsi:function_event_is_existing to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: table_event
-- requires: role_account
-- requires: role_anonymous

BEGIN;

CREATE FUNCTION maevsi.event_is_existing(
  author_username TEXT,
  slug TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  IF (EXISTS (SELECT 1 FROM maevsi.event WHERE "event".author_username = $1 AND "event".slug = $2)) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT STABLE SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.event_is_existing(TEXT, TEXT) IS 'Shows if an event exists.';

GRANT EXECUTE ON FUNCTION maevsi.event_is_existing(TEXT, TEXT) TO maevsi_account, maevsi_anonymous;

COMMIT;
