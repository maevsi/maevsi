-- Verify maevsi:enum_invitation_feedback on pg

BEGIN;

SELECT pg_catalog.has_type_privilege('maevsi.invitation_feedback', 'usage');

ROLLBACK;
