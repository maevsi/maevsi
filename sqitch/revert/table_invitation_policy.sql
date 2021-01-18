-- Revert maevsi:table_invitation_policy from pg

BEGIN;

DROP POLICY invitation_select ON maevsi.invitation;
DROP POLICY invitation_insert ON maevsi.invitation;

COMMIT;
