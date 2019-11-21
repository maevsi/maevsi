-- Verify maevsi:table_invite_account on pg

BEGIN;

SELECT "id",
       "event_id",
       "account_id"
FROM maevsi.invite_account WHERE FALSE;

ROLLBACK;
