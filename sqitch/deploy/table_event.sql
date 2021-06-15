-- Deploy maevsi:table_event to pg
-- requires: schema_public
-- requires: schema_private
-- requires: role_account
-- requires: role_anonymous
-- requires: table_account
-- requires: enum_event_visibility

BEGIN;

CREATE TABLE maevsi.event (
  id                       BIGSERIAL PRIMARY KEY,
  author_username          TEXT REFERENCES maevsi_private.account(username) NOT NULL,
  "description"            TEXT CHECK (char_length("description") > 0 AND char_length("description") < 10000),
  "end"                    TIMESTAMP WITH TIME ZONE,
  invitee_count_maximum    INTEGER CHECK (invitee_count_maximum > 0),
  is_archived              BOOLEAN NOT NULL DEFAULT FALSE,
  is_in_person             BOOLEAN,
  is_remote                BOOLEAN,
  "location"               TEXT CHECK (char_length("location") > 0 AND char_length("location") < 300),
  "name"                   TEXT NOT NULL CHECK (char_length("name") > 0 AND char_length("name") < 100),
  slug                     TEXT NOT NULL CHECK (char_length(slug) < 100 AND slug ~ '^[-A-Za-z0-9]+$'),
  "start"                  TIMESTAMP WITH TIME ZONE NOT NULL,
  "url"                    TEXT CHECK (char_length("url") < 300 AND "url" ~ '^https:\/\/'),
  visibility               maevsi.event_visibility NOT NULL,
  UNIQUE (author_username, slug)
);

COMMENT ON TABLE maevsi.event IS 'An event.';
COMMENT ON COLUMN maevsi.event.id IS E'@omit create,update\nThe event''s internal id.';
COMMENT ON COLUMN maevsi.event.author_username IS 'The event author''s username.';
COMMENT ON COLUMN maevsi.event.description IS 'The event''s description.';
COMMENT ON COLUMN maevsi.event.end IS 'The event''s end date and time, with timezone.';
COMMENT ON COLUMN maevsi.event.invitee_count_maximum IS 'The event''s maximum invitee count.';
COMMENT ON COLUMN maevsi.event.is_archived IS 'Indicates whether the event is archived.';
COMMENT ON COLUMN maevsi.event.is_in_person IS 'Indicates whether the event takes place in person.';
COMMENT ON COLUMN maevsi.event.is_remote IS 'Indicates whether the event takes place remotely.';
COMMENT ON COLUMN maevsi.event.location IS 'The event''s location as it can be shown on a map.';
COMMENT ON COLUMN maevsi.event.name IS 'The event''s name.';
COMMENT ON COLUMN maevsi.event.slug IS 'The event''s name, slugified.';
COMMENT ON COLUMN maevsi.event.start IS 'The event''s start date and time, with timezone.';
COMMENT ON COLUMN maevsi.event.url IS 'The event''s unified resource locator.';
COMMENT ON COLUMN maevsi.event.visibility IS 'The event''s visibility.';

-- GRANTs, RLS and POLICYs are specified in 'table_event_policy`.

COMMIT;
