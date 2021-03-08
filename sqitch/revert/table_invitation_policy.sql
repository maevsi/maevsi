-- Revert maevsi:table_invitation_policy from pg

BEGIN;

DROP TRIGGER maevsi_invitation_update ON maevsi.invitation;

DROP FUNCTION maevsi.trigger_invitation_update;

DROP POLICY invitation_select ON maevsi.invitation;
DROP POLICY invitation_insert ON maevsi.invitation;
DROP POLICY invitation_update ON maevsi.invitation;
DROP POLICY invitation_delete ON maevsi.invitation;

COMMIT;
