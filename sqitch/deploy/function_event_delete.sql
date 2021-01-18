-- Deploy maevsi:function_event_delete to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: table_account
-- requires: table_event
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.event_delete(
  organizer_username TEXT,
  slug TEXT,
  password TEXT
) RETURNS maevsi.event AS $$
DECLARE
  _current_username TEXT;
  _rows_affected maevsi.event;
BEGIN
  _current_username := current_setting('jwt.claims.username', true)::TEXT;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = _current_username AND account.password_hash = maevsi.crypt($3, account.password_hash))) THEN
    DELETE FROM maevsi.event WHERE event.organizer_username = $1 AND event.slug = $2 RETURNING * INTO _rows_affected;

    IF (_rows_affected IS NULL) THEN
      RAISE 'Event not found!' USING ERRCODE = 'no_data_found';
    ELSE
      RETURN _rows_affected;
    END IF;
  ELSE
    RAISE 'Account with given password not found!' USING ERRCODE = 'no_data_found';
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.event_delete(TEXT, TEXT, TEXT) IS 'Allows to delete an event.';

GRANT EXECUTE ON FUNCTION maevsi.event_delete(TEXT, TEXT, TEXT) TO maevsi_account;

COMMIT;
