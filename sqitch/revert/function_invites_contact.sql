-- Revert maevsi:function_invites_contact from pg

BEGIN;

DROP FUNCTION maevsi_private.invites_contact;

COMMIT;
