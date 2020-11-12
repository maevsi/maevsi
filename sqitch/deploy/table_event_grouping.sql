-- Deploy maevsi:table_event_grouping to pg
-- requires: schema_public
-- requires: role_account
-- requires: role_anonymous
-- requires: table_event
-- requires: table_event_group

BEGIN;

CREATE TABLE maevsi.event_grouping (
    id                BIGSERIAL PRIMARY KEY,
    event_id          INTEGER REFERENCES maevsi.event(id) NOT NULL,
    event_group_id    INTEGER REFERENCES maevsi.event_group(id) NOT NULL,
    UNIQUE (event_id, event_group_id)
);

COMMENT ON TABLE maevsi.event_grouping IS 'A bidirectional mapping between an event and an event group.';
COMMENT ON COLUMN maevsi.event_grouping.id IS 'The record''s id.';
COMMENT ON COLUMN maevsi.event_grouping.event_id IS 'The event''s id.';
COMMENT ON COLUMN maevsi.event_grouping.event_group_id IS 'The event group''s id.';

GRANT SELECT ON TABLE maevsi.event_grouping TO maevsi_account, maevsi_anonymous;
GRANT INSERT, UPDATE, DELETE ON TABLE maevsi.event_grouping TO maevsi_account;

GRANT USAGE ON SEQUENCE maevsi.event_grouping_id_seq TO maevsi_account;

ALTER TABLE maevsi.event_grouping ENABLE ROW LEVEL SECURITY;

-- TODO:
-- CREATE POLICY event_grouping_select ON maevsi.event_grouping FOR SELECT USING (
--     event_id IN (
--         SELECT id FROM maevsi.event
--     )
-- );

COMMIT;
