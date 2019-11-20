-- Deploy maevsi:index_account_person-id to pg
-- requires: table_account

BEGIN;

CREATE INDEX "idx_account_person-id" ON maevsi_private.account ("person_id");

COMMIT;
