-- Deploy maevsi:data_test to pg

BEGIN;

SELECT maevsi.account_registration('jonas', 'mail+sqitch-1@maev.si', 'testtest', 'en');
SELECT maevsi.account_email_address_verification((SELECT email_address_verification FROM maevsi_private.account WHERE username = 'jonas'));
SELECT maevsi.account_registration('peter', 'mail+sqitch-2@maev.si', 'testtest', 'de');
INSERT INTO maevsi.contact (
    "address",
    "email_address",
    "first_name",
    "last_name",
    "author_account_username"
  ) VALUES (
    e'A B\n12345 D',
    'mail+sqitch-3@maev.si',
    'Max',
    'Mustermann',
    'jonas'
  );
INSERT INTO maevsi.event (
    "name",
    "slug",
    "visibility",
    "invitee_count_maximum",
    "author_username",
    "description",
    "start",
    "end"
  ) VALUES (
    'Limited',
    'limited',
    'public',
    2,
    'jonas',
    'Event with limited capacity.',
    '2020-11-23 02:00:00.000000+00',
    '2020-11-23 09:00:00.000000+00'
  );
INSERT INTO maevsi.event (
    "name",
    "slug",
    "visibility",
    "author_username",
    "start",
    "end"
  ) VALUES (
    'Foreign Invited',
    'foreign-invited',
    'public',
    'peter',
    '2020-11-27 03:54:29.090009+00',
    '2020-11-27 05:56:23.090009+00'
  );
INSERT INTO maevsi.event (
    "name",
    "slug",
    "visibility",
    "author_username",
    "start",
    "end"
  ) VALUES (
    'Foreign Uninvited',
    'foreign-uninvited',
    'public',
    'peter',
    '2020-11-27 03:54:29.090009+00',
    '2020-11-27 05:56:23.090009+00'
  );
INSERT INTO maevsi.event (
    "name",
    "slug",
    "visibility",
    "author_username",
    "description",
    "location",
    "start"
  ) VALUES (
    'Private Party',
    'e2',
    'private',
    'jonas',
    'Offices parties lasting outward nothing age few resolve. Impression to discretion understood to we interested he excellence. Him remarkably use projection collecting. Going about eat forty world has round miles. Attention affection at my preferred offending shameless me if agreeable. Life lain held calm and true neat she. Much feet each so went no from. Truth began maids linen an mr to after.',
    'Schutz- und Grillhütte Frommershausen, 34246 Vellmar',
    '2019-11-27 03:54:29.090009+00'
  );
INSERT INTO maevsi.invitation (
    "uuid",
    "event_id",
    "contact_id",
    "feedback",
    "feedback_paper"
  ) VALUES (
    '59462df6-10a9-11ea-bf8e-0f50c4d91a7a',
    1,
    3,
    'accepted',
    'paper'
  );
INSERT INTO maevsi.invitation (
    "uuid",
    "event_id",
    "contact_id",
    "feedback",
    "feedback_paper"
  ) VALUES (
    '59462df6-10a9-11ea-bf8e-0f50c4d91a7b',
    4,
    3,
    'canceled',
    'digital'
  );
INSERT INTO maevsi.invitation (
    "uuid",
    "event_id",
    "contact_id"
  ) VALUES (
    '59462df6-10a9-11ea-bf8e-0f50c4d91a7c',
    2,
    1
  );
INSERT INTO maevsi.invitation (
    "uuid",
    "event_id",
    "contact_id"
  ) VALUES (
    '59462df6-10a9-11ea-bf8e-0f50c4d91a7d',
    1,
    2
  );

COMMIT;
