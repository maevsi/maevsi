-- Revert maevsi:table_upload from pg

BEGIN;

DROP TABLE maevsi.upload;

COMMIT;
