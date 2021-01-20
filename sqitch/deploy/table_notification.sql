-- Deploy maevsi:table_event to pg
-- requires: schema_private

BEGIN;

CREATE TABLE maevsi_private.notification (
  id                 BIGSERIAL PRIMARY KEY,
  channel            TEXT NOT NULL,
  is_acknowledged    BOOLEAN NOT NULL DEFAULT TRUE, -- TODO: Set default value to false in https://github.com/maevsi/maevsi/issues/210
  payload            TEXT CHECK (octet_length(payload) <= 8000) NOT NULL,
  "timestamp"        TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE maevsi_private.notification IS 'A notification.';
COMMENT ON COLUMN maevsi_private.notification.id IS 'The notification''s internal id.';
COMMENT ON COLUMN maevsi_private.notification.channel IS 'The notification''s channel.';
COMMENT ON COLUMN maevsi_private.notification.is_acknowledged IS 'Whether the notification was acknowledged.';
COMMENT ON COLUMN maevsi_private.notification.payload IS 'The notification''s payload.';
COMMENT ON COLUMN maevsi_private.notification.timestamp IS 'The notification''s timestamp.';

CREATE FUNCTION maevsi_private.notify() RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify(NEW.channel, NEW.payload);
  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.notify() IS 'Triggers a pg_notify for the given data.';

CREATE TRIGGER maevsi_private_notification
  BEFORE INSERT
  ON maevsi_private.notification
  FOR EACH ROW
  EXECUTE FUNCTION maevsi_private.notify();

COMMIT;
