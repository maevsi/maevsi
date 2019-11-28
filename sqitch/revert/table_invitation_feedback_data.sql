-- Revert maevsi:table_invitation_feedback_data from pg

BEGIN;

DROP TABLE maevsi.invitation_feedback_data;

COMMIT;
