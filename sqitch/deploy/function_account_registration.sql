-- Deploy maevsi:function_account_registration to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: schema_private
-- requires: table_account
-- requires: table_contact
-- requires: extension_pgcrypto
-- requires: table_notification
-- requires: role_anonymous

BEGIN;

CREATE FUNCTION maevsi.account_registration(
  username TEXT,
  email_address TEXT,
  "password" TEXT,
  "language" TEXT
) RETURNS VOID AS $$
DECLARE
  _new_account maevsi_private.account;
  _new_account_notify RECORD;
BEGIN
  IF (char_length($3) < 8) THEN
    RAISE 'Password too short!' USING ERRCODE = 'invalid_parameter_value';
  END IF;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = $1)) THEN
    RAISE 'An account with this username already exists!' USING ERRCODE = 'unique_violation';
  END IF;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.email_address = $2)) THEN
    RAISE 'An account with this email address already exists!' USING ERRCODE = 'unique_violation';
  END IF;

  INSERT INTO maevsi_private.account(username, email_address, password_hash, last_activity) VALUES
    ($1, $2, maevsi.crypt($3, maevsi.gen_salt('bf')), NOW())
    RETURNING * INTO _new_account;

  SELECT
    _new_account.username,
    _new_account.email_address,
    _new_account.email_address_verification,
    _new_account.email_address_verification_valid_until
  INTO _new_account_notify;

  INSERT INTO maevsi.contact(account_username, author_account_username) VALUES (_new_account.username, _new_account.username);

  INSERT INTO maevsi_private.notification (channel, payload) VALUES (
    'account_registration',
    jsonb_pretty(jsonb_build_object(
      'account', row_to_json(_new_account_notify),
      'template', jsonb_build_object('language', $4)
    ))
  );
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_registration(TEXT, TEXT, TEXT, TEXT) IS 'Creates a contact and registers an account referencing it.';

GRANT EXECUTE ON FUNCTION maevsi.account_registration(TEXT, TEXT, TEXT, TEXT) TO maevsi_anonymous;

COMMIT;
