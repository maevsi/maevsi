-- Revert maevsi:role_tusd from pg

BEGIN;

DROP OWNED BY maevsi_tusd;
DROP ROLE maevsi_tusd;

COMMIT;
