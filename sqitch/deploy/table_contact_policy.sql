-- Deploy maevsi:table_contact_policy to pg
-- requires: schema_public
-- requires: table_contact
-- requires: function_invitation_contact_ids

BEGIN;

GRANT SELECT ON TABLE maevsi.contact TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.contact TO maevsi_account;

GRANT USAGE ON SEQUENCE maevsi.contact_id_seq TO maevsi_account;

ALTER TABLE maevsi.contact ENABLE ROW LEVEL SECURITY;

-- Only display contacts that reference the invoker's account.
-- Only display contacts that were created by the invoker's account.
-- Only display contacts for which an accessible invitation exists.
CREATE POLICY contact_select ON maevsi.contact FOR SELECT USING (
      account_username = current_setting('jwt.claims.username', true)::TEXT
  OR  creator_account_username = current_setting('jwt.claims.username', true)::TEXT
  OR  id IN (SELECT maevsi.invitation_contact_ids())
);

-- Only allow inserts for contacts created by the own user.
CREATE POLICY contact_insert ON maevsi.contact FOR INSERT WITH CHECK (
  creator_account_username = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow updates for contacts created by the own user.
CREATE POLICY contact_update ON maevsi.contact FOR UPDATE USING (
  creator_account_username = current_setting('jwt.claims.username', true)::TEXT
);

-- Only allow deletes for contacts created by the own user.
CREATE POLICY contact_delete ON maevsi.contact FOR DELETE USING (
  creator_account_username = current_setting('jwt.claims.username', true)::TEXT
);

COMMIT;
