-- Verify maevsi:table_invitation on pg

BEGIN;

SELECT id,
       uuid,
       event_id,
       feedback,
       feedback_paper
FROM maevsi.invitation WHERE FALSE;

ROLLBACK;
