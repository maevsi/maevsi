-- Deploy maevsi:function_authenticate to pg
-- requires: privilege_execute_revoke
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: type_jwt
-- requires: table_account
-- requires: table_jwt

BEGIN;

CREATE FUNCTION maevsi.authenticate(
  "username" TEXT,
  "password" TEXT
) RETURNS maevsi.jwt AS $$
DECLARE
    "_jwt_id" UUID := maevsi.uuid_generate_v1mc();
    "_jwt" maevsi.jwt;
BEGIN
  IF ("username" = '' AND "password" = '') THEN
    -- Authenticate as guest.
    "_jwt" := ("_jwt_id", 'maevsi_anonymous', NULL, NULL, maevsi.invite_claim_array())::maevsi.jwt;
  ELSIF ("username" IS NOT NULL AND "password" IS NOT NULL) THEN
    "_jwt" := (SELECT ("_jwt_id", 'maevsi_account', account.contact_id, account.username, NULL)::maevsi.jwt
      FROM maevsi_private.account
      WHERE
        account."username" = $1
        AND account.password_hash = maevsi.crypt($2, account.password_hash));
  END IF;

  IF NOT "_jwt" IS NULL
  THEN
    INSERT INTO maevsi_private.jwt VALUES ("_jwt_id", "_jwt");

    RETURN "_jwt";
  ELSE
    RAISE 'Account not found!' USING ERRCODE = 'no_data_found';
  END IF;
END $$ LANGUAGE PLPGSQL STRICT SECURITY DEFINER;

COMMENT ON FUNCTION maevsi.authenticate(TEXT, TEXT) IS 'Creates a JWT token that will securely identify an account and give it certain permissions.';

GRANT EXECUTE ON FUNCTION maevsi.authenticate(TEXT, TEXT) TO maevsi_anonymous;

COMMIT;
