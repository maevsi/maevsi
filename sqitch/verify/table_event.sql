-- Verify maevsi:table_event on pg

BEGIN;

SELECT id,
       author_username,
       "description",
       "end",
       invitee_count_maximum,
       is_archived,
       is_in_person,
       is_remote,
       "location",
       "name",
       slug,
       "start",
       visibility
FROM maevsi.event WHERE FALSE;

ROLLBACK;
