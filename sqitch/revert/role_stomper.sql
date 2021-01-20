-- Revert maevsi:role_stomper from pg

BEGIN;

DROP OWNED BY maevsi_stomper;
DROP ROLE maevsi_stomper;

COMMIT;
