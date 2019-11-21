-- Revert maevsi:role_anonymous from pg

BEGIN;

DROP ROLE maevsi_anonymous;

COMMIT;
