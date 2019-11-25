-- Revert maevsi:enum_paper_invitation_feedback from pg

BEGIN;

DROP TYPE maevsi.invitation_feedback_paper;

COMMIT;
