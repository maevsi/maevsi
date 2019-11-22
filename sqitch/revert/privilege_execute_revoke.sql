-- Revert maevsi:privilege_execute_revoke from pg

BEGIN;

ALTER DEFAULT PRIVILEGES GRANT EXECUTE ON FUNCTIONS TO PUBLIC;

COMMIT;
