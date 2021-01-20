-- Verify maevsi:table_invitation on pg

BEGIN;

SELECT id,
       event_id,
       feedback,
       feedback_paper,
       uuid
FROM maevsi.invitation WHERE FALSE;

ROLLBACK;
