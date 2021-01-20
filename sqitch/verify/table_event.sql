-- Verify maevsi:table_event on pg

BEGIN;

SELECT id,
       "description",
       "end",
       invitee_count_maximum,
       is_archived,
       is_in_person,
       is_remote,
       "location",
       "name",
       organizer_username,
       slug,
       "start",
       visibility
FROM maevsi.event WHERE FALSE;

ROLLBACK;
