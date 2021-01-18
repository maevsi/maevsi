-- Verify maevsi:table_event on pg

BEGIN;

SELECT id,
       "name",
       slug,
       visibility,
       invitee_count_maximum,
       organizer_username,
       "description",
       "location",
       "start",
       "end",
       is_archived,
       is_in_person,
       is_remote
FROM maevsi.event WHERE FALSE;

ROLLBACK;
