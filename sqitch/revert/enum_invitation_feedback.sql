-- Revert maevsi:enum_invitation_feedback from pg

BEGIN;

DROP TYPE invitation_feedback;

COMMIT;
