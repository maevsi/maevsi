-- Deploy maevsi:function_authenticate to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requries: extension_uuid-ossp
-- requires: role_account
-- requires: role_anonymous
-- requires: type_jwt
-- requires: table_account
-- requires: table_jwt

BEGIN;

CREATE FUNCTION maevsi.authenticate(
  username TEXT,
  password TEXT
) RETURNS maevsi.jwt AS $$
DECLARE
    _jwt_id UUID := maevsi.uuid_generate_v1mc();
    _jwt_exp BIGINT := EXTRACT(EPOCH FROM ((SELECT date_trunc('second', NOW()::TIMESTAMP)) + COALESCE(current_setting('maevsi.jwt_expiry_duration', true), '1 day')::INTERVAL));
    _jwt maevsi.jwt;
BEGIN
  IF ($1 = '' AND $2 = '') THEN
    -- Authenticate as guest.
    _jwt := (_jwt_id, 'maevsi_anonymous', NULL, NULL, maevsi.invite_claim_array(), _jwt_exp)::maevsi.jwt;
  ELSIF ($1 IS NOT NULL AND $2 IS NOT NULL) THEN
    IF ((
        SELECT account.email_address_verification
        FROM maevsi_private.account
        WHERE
              account.username = $1
          AND account.password_hash = maevsi.crypt($2, account.password_hash)
      ) IS NOT NULL) THEN
      RAISE 'Account not verified!' USING ERRCODE = 'object_not_in_prerequisite_state';
    END IF;

    WITH updated AS (
      UPDATE maevsi_private.account
      SET (last_activity, password_reset_verification) = (DEFAULT, NULL)
      WHERE
            account.username = $1
        AND account.email_address_verification IS NULL -- Has been checked before, but better safe than sorry.
        AND account.password_hash = maevsi.crypt($2, account.password_hash)
      RETURNING *
    ) SELECT _jwt_id, 'maevsi_account', updated.id, updated.username, NULL, _jwt_exp
      FROM updated
      INTO _jwt;

    IF (_jwt IS NULL) THEN
      RAISE 'Account not found!' USING ERRCODE = 'no_data_found';
    END IF;
  END IF;

  INSERT INTO maevsi_private.jwt(uuid, token) VALUES (_jwt_id, _jwt);
  RETURN _jwt;
END $$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.authenticate(TEXT, TEXT) IS 'Creates a JWT token that will securely identify an account and give it certain permissions.';

GRANT EXECUTE ON FUNCTION maevsi.authenticate(TEXT, TEXT) TO maevsi_anonymous;

COMMIT;
