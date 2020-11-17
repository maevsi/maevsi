-- Deploy maevsi:function_account_register to pg
-- requires: privilege_execute_revoke
-- requires: schema_private
-- requires: schema_public
-- requires: role_anonymous
-- requires: table_contact
-- requires: table_account
-- requires: extension_pgcrypto

BEGIN;

CREATE FUNCTION maevsi.account_register(
  username TEXT,
  email_address TEXT,
  password TEXT
) RETURNS VOID AS $$
DECLARE
  _new_account maevsi_private.account;
  _new_account_notify RECORD;
BEGIN
  IF char_length($3) < 8
  THEN
    RAISE 'Password too short!' USING ERRCODE = 'invalid_parameter_value';
  END IF;

  IF EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = $1)
  THEN
    RAISE 'An account with this username already exists!' USING ERRCODE = 'unique_violation';
  END IF;

  IF EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.email_address = $2)
  THEN
    RAISE 'An account with this email address already exists!' USING ERRCODE = 'unique_violation';
  END IF;

  INSERT INTO maevsi_private.account(username, email_address, password_hash, last_activity) VALUES
    ($1, $2, maevsi.crypt($3, maevsi.gen_salt('bf')), NOW())
    RETURNING * INTO _new_account;

  SELECT _new_account.username, _new_account.email_address, _new_account.email_address_verification
  INTO _new_account_notify;

  INSERT INTO maevsi.contact(account_id) VALUES (_new_account.id);

  PERFORM pg_notify('account_register', jsonb_pretty(jsonb_build_object('account', row_to_json(_new_account_notify))));
END;
$$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.account_register(TEXT, TEXT, TEXT) IS 'Creates a contact and registers an account referencing it.';

GRANT EXECUTE ON FUNCTION maevsi.account_register(TEXT, TEXT, TEXT) TO maevsi_anonymous;

COMMIT;
