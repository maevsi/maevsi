-- Deploy maevsi:table_account to pg
-- requires: schema_private
-- requires: schema_public
-- requires: extension_uuid-ossp

BEGIN;

CREATE TABLE maevsi_private.account (
  id                                         BIGSERIAL PRIMARY KEY,
  username                                   TEXT NOT NULL CHECK (char_length(username) < 100 AND username ~* '^[-A-Za-z0-9]+$') UNIQUE,
  email_address                              TEXT NOT NULL CHECK (char_length(email_address) < 320 AND email_address ~* '^.+@.+\..+$') UNIQUE,
  email_address_verification                 UUID DEFAULT maevsi.uuid_generate_v1mc(),
  email_address_verification_valid_until     TIMESTAMP,
  password_hash                              TEXT NOT NULL,
  password_reset_verification                UUID,
  password_reset_verification_valid_until    TIMESTAMP,
  created                                    TIMESTAMP NOT NULL DEFAULT NOW(),
  last_activity                              TIMESTAMP NOT NULL DEFAULT NOW(),
  upload_quota_bytes                         BIGINT NOT NULL DEFAULT 10485760 -- 10 mebibyte
);

COMMENT ON TABLE maevsi_private.account IS 'Account data.';
COMMENT ON COLUMN maevsi_private.account.username IS 'The account''s username.';
COMMENT ON COLUMN maevsi_private.account.email_address IS 'The account''s e-mail address for account related information.';
COMMENT ON COLUMN maevsi_private.account.email_address_verification IS 'The UUID that is used to verify an e-mail address, or null if already verified.';
COMMENT ON COLUMN maevsi_private.account.password_hash IS 'The account''s password, hashed and salted.';
COMMENT ON COLUMN maevsi_private.account.created IS 'Timestamp at which the account was last active.';
COMMENT ON COLUMN maevsi_private.account.last_activity IS 'Timestamp at which the account last requested an access token.';
COMMENT ON COLUMN maevsi_private.account.upload_quota_bytes IS 'The account''s upload quota in bytes.';

CREATE FUNCTION maevsi_private.account_email_address_verification_valid_until() RETURNS TRIGGER AS $$
  BEGIN
    IF (NEW.email_address_verification IS NULL) THEN
      NEW.email_address_verification_valid_until = NULL;
    ELSE
      IF ((OLD IS NULL) OR (OLD.email_address_verification IS DISTINCT FROM NEW.email_address_verification)) THEN
        NEW.email_address_verification_valid_until = (SELECT (NOW() + INTERVAL '1 day')::TIMESTAMP);
      END IF;
    END IF;

    RETURN NEW;
  END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.account_email_address_verification_valid_until() IS 'Sets the valid until column of the email address verification to it''s default value.';

GRANT EXECUTE ON FUNCTION maevsi_private.account_email_address_verification_valid_until() TO maevsi_account;

CREATE FUNCTION maevsi_private.account_password_reset_verification_valid_until() RETURNS TRIGGER AS $$
  BEGIN
    IF (NEW.password_reset_verification IS NULL) THEN
      NEW.password_reset_verification_valid_until = NULL;
    ELSE
      IF ((OLD IS NULL) OR (OLD.password_reset_verification IS DISTINCT FROM NEW.password_reset_verification)) THEN
        NEW.password_reset_verification_valid_until = (SELECT (NOW() + INTERVAL '2 hours')::TIMESTAMP);
      END IF;
    END IF;

    RETURN NEW;
  END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi_private.account_password_reset_verification_valid_until() IS 'Sets the valid until column of the email address verification to it''s default value.';

GRANT EXECUTE ON FUNCTION maevsi_private.account_password_reset_verification_valid_until() TO maevsi_account;

CREATE TRIGGER maevsi_private_account_email_address_verification_valid_until
  BEFORE
       INSERT
    OR UPDATE OF email_address_verification
  ON maevsi_private.account
  FOR EACH ROW
  EXECUTE PROCEDURE maevsi_private.account_email_address_verification_valid_until();

CREATE TRIGGER maevsi_private_account_password_reset_verification_valid_until
  BEFORE
       INSERT
    OR UPDATE OF password_reset_verification
  ON maevsi_private.account
  FOR EACH ROW
  EXECUTE PROCEDURE maevsi_private.account_password_reset_verification_valid_until();

COMMIT;
