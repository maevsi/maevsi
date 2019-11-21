-- Revert maevsi:enum_invitation_feedback from pg

BEGIN;

DROP TYPE maevsi.invitation_feedback;

COMMIT;
