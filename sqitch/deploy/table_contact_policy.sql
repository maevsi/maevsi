-- Deploy maevsi:table_contact_policy to pg
-- requires: schema_public
-- requires: table_contact
-- requires: role_account
-- requires: role_anonymous
-- requires: function_invitation_contact_ids

BEGIN;

GRANT SELECT ON TABLE maevsi.contact TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.contact TO maevsi_account;

GRANT USAGE ON SEQUENCE maevsi.contact_id_seq TO maevsi_account;

ALTER TABLE maevsi.contact ENABLE ROW LEVEL SECURITY;

-- Only display contacts referencing the invoker's account.
-- Only display contacts authored by the invoker's account.
-- Only display contacts for which an accessible invitation exists.
CREATE POLICY contact_select ON maevsi.contact FOR SELECT USING (
      account_username = current_setting('jwt.claims.username', true)::TEXT
  OR  author_account_username = current_setting('jwt.claims.username', true)::TEXT
  OR  id IN (SELECT maevsi.invitation_contact_ids())
);

-- Only allow inserts for contacts authored by the invoker's account.
CREATE POLICY contact_insert ON maevsi.contact FOR INSERT WITH CHECK (
  author_account_username = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow updates for contacts authored by the invoker's account.
CREATE POLICY contact_update ON maevsi.contact FOR UPDATE USING (
  author_account_username = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow deletes for contacts authored by the invoker's account.
CREATE POLICY contact_delete ON maevsi.contact FOR DELETE USING (
  author_account_username = current_setting('jwt.claims.username', true)::TEXT
  AND
  account_username != current_setting('jwt.claims.username', true)::TEXT
);

COMMIT;
