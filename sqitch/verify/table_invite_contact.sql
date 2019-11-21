-- Verify maevsi:table_invite_contact on pg

BEGIN;

SELECT "id",
       "event_id",
       "contact_id"
FROM maevsi.invite_contact WHERE FALSE;

ROLLBACK;
