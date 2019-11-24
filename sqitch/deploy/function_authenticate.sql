-- Deploy maevsi:function_authenticate to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: type_jwt
-- requires: table_account

BEGIN;

CREATE FUNCTION maevsi.authenticate(
  "e-mail_address" TEXT,
  "password" TEXT
) RETURNS maevsi.jwt AS $$
  SELECT ('maevsi_account', contact_id)::maevsi.jwt
    FROM maevsi_private.account
    WHERE
      account."e-mail_address" = $1
      AND account.password_hash = maevsi.crypt($2, account.password_hash);
$$ LANGUAGE SQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.authenticate(TEXT, TEXT) IS 'Creates a JWT token that will securely identify an account and give it certain permissions.';

GRANT EXECUTE ON FUNCTION maevsi.authenticate(TEXT, TEXT) TO maevsi_account, maevsi_anonymous;

COMMIT;
