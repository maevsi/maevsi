-- Revert maevsi:data_test from pg

BEGIN;

DELETE FROM maevsi.profile_picture;
ALTER SEQUENCE maevsi.profile_picture_id_seq RESTART;
DELETE FROM maevsi.upload;
ALTER SEQUENCE maevsi.upload_id_seq RESTART;
DELETE FROM maevsi.invitation;
ALTER SEQUENCE maevsi.invitation_id_seq RESTART;
DELETE FROM maevsi.event;
ALTER SEQUENCE maevsi.event_id_seq RESTART;
DELETE FROM maevsi.contact;
ALTER SEQUENCE maevsi.contact_id_seq RESTART;
DELETE FROM maevsi_private.account;
ALTER SEQUENCE maevsi_private.account_id_seq RESTART;

COMMIT;
