-- Revert maevsi:type_redeem_response from pg

BEGIN;

DROP TYPE maevsi.redeem_response;

COMMIT;
