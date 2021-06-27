-- Deploy maevsi:function_notification_acknowledge to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: schema_private
-- requires: table_notification

BEGIN;

CREATE FUNCTION maevsi.notification_acknowledge(
  id BIGINT,
  is_acknowledged BOOLEAN
) RETURNS VOID AS $$
BEGIN
  IF (EXISTS (SELECT 1 FROM maevsi_private.notification WHERE "notification".id = $1)) THEN
    UPDATE maevsi_private.notification SET is_acknowledged = $2 WHERE "notification".id = $1;
  ELSE
    RAISE 'Notification with given id not found!' USING ERRCODE = 'no_data_found';
  END IF;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.notification_acknowledge(BIGINT, BOOLEAN) IS 'Allows to set the acknowledgement state of a notification.';

GRANT EXECUTE ON FUNCTION maevsi.notification_acknowledge(BIGINT, BOOLEAN) TO maevsi_stomper;

COMMIT;
