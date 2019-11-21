-- Deploy maevsi:function_account_current_id to pg
-- requires: schema_public
-- requires: table_account

BEGIN;

CREATE FUNCTION maevsi.account_current_id() RETURNS INTEGER AS $$
  SELECT contact_id
  FROM maevsi_private.account
  WHERE contact_id = current_setting('jwt.claims.account_id', true)::integer
$$ LANGUAGE SQL STABLE;

COMMENT ON FUNCTION maevsi.account_current_id() is 'Gets the id of the account that was identified by the JWT.';

COMMIT;
