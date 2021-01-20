-- Verify maevsi:table_contact on pg

BEGIN;

SELECT id,
       account_username,
       "address",
       author_account_username,
       email_address,
       email_address_hash,
       first_name,
       last_name
FROM maevsi.contact WHERE FALSE;

ROLLBACK;
