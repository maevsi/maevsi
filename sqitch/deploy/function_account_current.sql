-- Deploy maevsi:function_account_current to pg
-- requires: schema_public
-- requires: table_contact

BEGIN;

CREATE FUNCTION maevsi.account_current() RETURNS maevsi.contact AS $$
  SELECT *
  FROM maevsi.contact
  WHERE id = current_setting('jwt.claims.account_id', true)::integer
$$ LANGUAGE SQL STABLE;

COMMENT ON FUNCTION maevsi.account_current() is 'Gets the contact who was identified by the JWT.';

COMMIT;
