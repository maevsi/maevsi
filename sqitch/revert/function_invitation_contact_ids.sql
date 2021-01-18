-- Revert maevsi:function_invitation_contact_ids from pg

BEGIN;

DROP FUNCTION maevsi.invitation_contact_ids;

COMMIT;
