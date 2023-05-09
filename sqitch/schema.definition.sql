--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.2 (Debian 15.2-1.pgdg110+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: maevsi; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA maevsi;


ALTER SCHEMA maevsi OWNER TO postgres;

--
-- Name: SCHEMA maevsi; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA maevsi IS 'Is used by PostGraphile.';


--
-- Name: maevsi_private; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA maevsi_private;


ALTER SCHEMA maevsi_private OWNER TO postgres;

--
-- Name: SCHEMA maevsi_private; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA maevsi_private IS 'Contains account information and is not used by PostGraphile.';


--
-- Name: sqitch; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA sqitch;


ALTER SCHEMA sqitch OWNER TO postgres;

--
-- Name: SCHEMA sqitch; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA sqitch IS 'Sqitch database deployment metadata v1.1.';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA maevsi;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'Provides password hashing functions.';


--
-- Name: jwt; Type: TYPE; Schema: maevsi; Owner: postgres
--

CREATE TYPE maevsi.jwt AS (
	id uuid,
	role text,
	username text,
	invitations uuid[],
	exp bigint
);


ALTER TYPE maevsi.jwt OWNER TO postgres;

--
-- Name: event_unlock_response; Type: TYPE; Schema: maevsi; Owner: postgres
--

CREATE TYPE maevsi.event_unlock_response AS (
	author_username text,
	event_slug text,
	jwt maevsi.jwt
);


ALTER TYPE maevsi.event_unlock_response OWNER TO postgres;

--
-- Name: event_visibility; Type: TYPE; Schema: maevsi; Owner: postgres
--

CREATE TYPE maevsi.event_visibility AS ENUM (
    'public',
    'private'
);


ALTER TYPE maevsi.event_visibility OWNER TO postgres;

--
-- Name: TYPE event_visibility; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TYPE maevsi.event_visibility IS 'Possible visibilities of events and event groups: public, private.';


--
-- Name: invitation_feedback; Type: TYPE; Schema: maevsi; Owner: postgres
--

CREATE TYPE maevsi.invitation_feedback AS ENUM (
    'accepted',
    'canceled'
);


ALTER TYPE maevsi.invitation_feedback OWNER TO postgres;

--
-- Name: TYPE invitation_feedback; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TYPE maevsi.invitation_feedback IS 'Possible answers to an invitation: accepted, canceled.';


--
-- Name: invitation_feedback_paper; Type: TYPE; Schema: maevsi; Owner: postgres
--

CREATE TYPE maevsi.invitation_feedback_paper AS ENUM (
    'none',
    'paper',
    'digital'
);


ALTER TYPE maevsi.invitation_feedback_paper OWNER TO postgres;

--
-- Name: TYPE invitation_feedback_paper; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TYPE maevsi.invitation_feedback_paper IS 'Possible choices on how to receive a paper invitation: paper, digital.';


--
-- Name: account_delete(text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_delete(password text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _current_username TEXT;
BEGIN
  _current_username := current_setting('jwt.claims.username', true)::TEXT;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = _current_username AND account.password_hash = maevsi.crypt($1, account.password_hash))) THEN
    IF (EXISTS (SELECT 1 FROM maevsi.event WHERE event.author_username = _current_username)) THEN
      RAISE 'You still own events!' USING ERRCODE = 'foreign_key_violation';
    ELSE
      DELETE FROM maevsi_private.account WHERE account.username = _current_username;
    END IF;
  ELSE
    RAISE 'Account with given password not found!' USING ERRCODE = 'invalid_password';
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.account_delete(password text) OWNER TO postgres;

--
-- Name: FUNCTION account_delete(password text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_delete(password text) IS 'Allows to delete an account.';


--
-- Name: account_email_address_verification(uuid); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_email_address_verification(code uuid) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _account maevsi_private.account;
BEGIN
  SELECT *
    FROM maevsi_private.account
    INTO _account
    WHERE account.email_address_verification = $1;

  IF (_account IS NULL) THEN
    RAISE 'Unknown verification code!' USING ERRCODE = 'no_data_found';
  END IF;

  IF (_account.email_address_verification_valid_until < NOW()) THEN
    RAISE 'Verification code expired!' USING ERRCODE = 'object_not_in_prerequisite_state';
  END IF;

  UPDATE maevsi_private.account
    SET email_address_verification = NULL
    WHERE email_address_verification = $1;
END;
$_$;


ALTER FUNCTION maevsi.account_email_address_verification(code uuid) OWNER TO postgres;

--
-- Name: FUNCTION account_email_address_verification(code uuid); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_email_address_verification(code uuid) IS 'Sets the account''s email address verification code to `NULL` for which the email address verification code equals the one passed and is up to date.';


--
-- Name: account_is_existing(text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_is_existing(username text) RETURNS boolean
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $_$
BEGIN
  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = $1)) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.account_is_existing(username text) OWNER TO postgres;

--
-- Name: FUNCTION account_is_existing(username text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_is_existing(username text) IS 'Shows if an account exists.';


--
-- Name: account_password_change(text, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_password_change(password_current text, password_new text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _current_username TEXT;
BEGIN
  IF (char_length($2) < 8) THEN
      RAISE 'New password too short!' USING ERRCODE = 'invalid_parameter_value';
  END IF;

  _current_username := current_setting('jwt.claims.username', true)::TEXT;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = _current_username AND account.password_hash = maevsi.crypt($1, account.password_hash))) THEN
    UPDATE maevsi_private.account SET password_hash = maevsi.crypt($2, maevsi.gen_salt('bf')) WHERE account.username = _current_username;
  ELSE
    RAISE 'Account with given password not found!' USING ERRCODE = 'invalid_password';
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.account_password_change(password_current text, password_new text) OWNER TO postgres;

--
-- Name: FUNCTION account_password_change(password_current text, password_new text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_password_change(password_current text, password_new text) IS 'Allows to change an account''s password.';


--
-- Name: account_password_reset(uuid, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_password_reset(code uuid, password text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _account maevsi_private.account;
BEGIN
  IF (char_length($2) < 8) THEN
    RAISE 'Password too short!' USING ERRCODE = 'invalid_parameter_value';
  END IF;

  SELECT *
    FROM maevsi_private.account
    INTO _account
    WHERE account.password_reset_verification = $1;

  IF (_account IS NULL) THEN
    RAISE 'Unknown reset code!' USING ERRCODE = 'no_data_found';
  END IF;

  IF (_account.password_reset_verification_valid_until < NOW()) THEN
    RAISE 'Reset code expired!' USING ERRCODE = 'object_not_in_prerequisite_state';
  END IF;

  UPDATE maevsi_private.account
    SET
      password_hash = maevsi.crypt($2, maevsi.gen_salt('bf')),
      password_reset_verification = NULL
    WHERE account.password_reset_verification = $1;
END;
$_$;


ALTER FUNCTION maevsi.account_password_reset(code uuid, password text) OWNER TO postgres;

--
-- Name: FUNCTION account_password_reset(code uuid, password text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_password_reset(code uuid, password text) IS 'Sets a new password for an account if there was a request to do so before that''s still up to date.';


--
-- Name: account_password_reset_request(text, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_password_reset_request(email_address text, language text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _notify_data RECORD;
BEGIN
  WITH updated AS (
    UPDATE maevsi_private.account
      SET password_reset_verification = gen_random_uuid()
      WHERE account.email_address = $1
      RETURNING *
  ) SELECT
    updated.username,
    updated.email_address,
    updated.password_reset_verification,
    updated.password_reset_verification_valid_until
    FROM updated
    INTO _notify_data;

  IF (_notify_data IS NULL) THEN
    -- noop
  ELSE
    INSERT INTO maevsi_private.notification (channel, payload) VALUES (
      'account_password_reset_request',
      jsonb_pretty(jsonb_build_object(
        'account', _notify_data,
        'template', jsonb_build_object('language', $2)
      ))
    );
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.account_password_reset_request(email_address text, language text) OWNER TO postgres;

--
-- Name: FUNCTION account_password_reset_request(email_address text, language text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_password_reset_request(email_address text, language text) IS 'Sets a new password reset verification code for an account.';


--
-- Name: account_registration(text, text, text, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_registration(username text, email_address text, password text, language text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _new_account maevsi_private.account;
  _new_account_notify RECORD;
BEGIN
  IF (char_length($3) < 8) THEN
    RAISE 'Password too short!' USING ERRCODE = 'invalid_parameter_value';
  END IF;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = $1)) THEN
    RAISE 'An account with this username already exists!' USING ERRCODE = 'unique_violation';
  END IF;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.email_address = $2)) THEN
    RAISE 'An account with this email address already exists!' USING ERRCODE = 'unique_violation';
  END IF;

  INSERT INTO maevsi_private.account(username, email_address, password_hash, last_activity) VALUES
    ($1, $2, maevsi.crypt($3, maevsi.gen_salt('bf')), NOW())
    RETURNING * INTO _new_account;

  SELECT
    _new_account.username,
    _new_account.email_address,
    _new_account.email_address_verification,
    _new_account.email_address_verification_valid_until
  INTO _new_account_notify;

  INSERT INTO maevsi.contact(account_username, author_account_username) VALUES (_new_account.username, _new_account.username);

  INSERT INTO maevsi_private.notification (channel, payload) VALUES (
    'account_registration',
    jsonb_pretty(jsonb_build_object(
      'account', row_to_json(_new_account_notify),
      'template', jsonb_build_object('language', $4)
    ))
  );
END;
$_$;


ALTER FUNCTION maevsi.account_registration(username text, email_address text, password text, language text) OWNER TO postgres;

--
-- Name: FUNCTION account_registration(username text, email_address text, password text, language text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_registration(username text, email_address text, password text, language text) IS 'Creates a contact and registers an account referencing it.';


--
-- Name: account_registration_refresh(text, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_registration_refresh(username text, language text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _new_account_notify RECORD;
BEGIN
  RAISE 'Refreshing registrations is currently not available due to missing rate limiting!' USING ERRCODE = 'deprecated_feature';

  IF (NOT EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = $1)) THEN
    RAISE 'An account with this username does not exists!' USING ERRCODE = 'invalid_parameter_value';
  END IF;

  WITH updated AS (
    UPDATE maevsi_private.account
      SET email_address_verification = DEFAULT
      WHERE account.username = $1
      RETURNING *
  ) SELECT
    updated.username,
    updated.email_address,
    updated.email_address_verification,
    updated.email_address_verification_valid_until
    FROM updated
    INTO _new_account_notify;

  INSERT INTO maevsi_private.notification (channel, payload) VALUES (
    'account_registration',
    jsonb_pretty(jsonb_build_object(
      'account', row_to_json(_new_account_notify),
      'template', jsonb_build_object('language', $2)
    ))
  );
END;
$_$;


ALTER FUNCTION maevsi.account_registration_refresh(username text, language text) OWNER TO postgres;

--
-- Name: FUNCTION account_registration_refresh(username text, language text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_registration_refresh(username text, language text) IS 'Refreshes an account''s email address verification validity period.';


--
-- Name: account_upload_quota_bytes(); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.account_upload_quota_bytes() RETURNS bigint
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $$
BEGIN
  RETURN (SELECT upload_quota_bytes FROM maevsi_private.account WHERE account.username = current_setting('jwt.claims.username', true)::TEXT);
END;
$$;


ALTER FUNCTION maevsi.account_upload_quota_bytes() OWNER TO postgres;

--
-- Name: FUNCTION account_upload_quota_bytes(); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.account_upload_quota_bytes() IS 'Gets the total upload quota in bytes for the invoking account.';


--
-- Name: authenticate(text, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.authenticate(username text, password text) RETURNS maevsi.jwt
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
    _jwt_id UUID := gen_random_uuid();
    _jwt_exp BIGINT := EXTRACT(EPOCH FROM ((SELECT date_trunc('second', NOW()::TIMESTAMP)) + COALESCE(current_setting('maevsi.jwt_expiry_duration', true), '1 day')::INTERVAL));
    _jwt maevsi.jwt;
BEGIN
  IF ($1 = '' AND $2 = '') THEN
    -- Authenticate as guest.
    _jwt := (_jwt_id, 'maevsi_anonymous', NULL, maevsi.invitation_claim_array(), _jwt_exp)::maevsi.jwt;
  ELSIF ($1 IS NOT NULL AND $2 IS NOT NULL) THEN
    IF ((
        SELECT account.email_address_verification
        FROM maevsi_private.account
        WHERE
              account.username = $1
          AND account.password_hash = maevsi.crypt($2, account.password_hash)
      ) IS NOT NULL) THEN
      RAISE 'Account not verified!' USING ERRCODE = 'object_not_in_prerequisite_state';
    END IF;

    WITH updated AS (
      UPDATE maevsi_private.account
      SET (last_activity, password_reset_verification) = (DEFAULT, NULL)
      WHERE
            account.username = $1
        AND account.email_address_verification IS NULL -- Has been checked before, but better safe than sorry.
        AND account.password_hash = maevsi.crypt($2, account.password_hash)
      RETURNING *
    ) SELECT _jwt_id, 'maevsi_account', updated.username, NULL, _jwt_exp
      FROM updated
      INTO _jwt;

    IF (_jwt IS NULL) THEN
      RAISE 'Account not found!' USING ERRCODE = 'no_data_found';
    END IF;
  END IF;

  INSERT INTO maevsi_private.jwt(uuid, token) VALUES (_jwt_id, _jwt);
  RETURN _jwt;
END;
$_$;


ALTER FUNCTION maevsi.authenticate(username text, password text) OWNER TO postgres;

--
-- Name: FUNCTION authenticate(username text, password text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.authenticate(username text, password text) IS 'Creates a JWT token that will securely identify an account and give it certain permissions.';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: event; Type: TABLE; Schema: maevsi; Owner: postgres
--

CREATE TABLE maevsi.event (
    id bigint NOT NULL,
    author_username text NOT NULL,
    description text,
    "end" timestamp with time zone,
    invitee_count_maximum integer,
    is_archived boolean DEFAULT false NOT NULL,
    is_in_person boolean,
    is_remote boolean,
    location text,
    name text NOT NULL,
    slug text NOT NULL,
    start timestamp with time zone NOT NULL,
    url text,
    visibility maevsi.event_visibility NOT NULL,
    CONSTRAINT event_description_check CHECK (((char_length(description) > 0) AND (char_length(description) < 1000000))),
    CONSTRAINT event_invitee_count_maximum_check CHECK ((invitee_count_maximum > 0)),
    CONSTRAINT event_location_check CHECK (((char_length(location) > 0) AND (char_length(location) < 300))),
    CONSTRAINT event_name_check CHECK (((char_length(name) > 0) AND (char_length(name) < 100))),
    CONSTRAINT event_slug_check CHECK (((char_length(slug) < 100) AND (slug ~ '^[-A-Za-z0-9]+$'::text))),
    CONSTRAINT event_url_check CHECK (((char_length(url) < 300) AND (url ~ '^https:\/\/'::text)))
);


ALTER TABLE maevsi.event OWNER TO postgres;

--
-- Name: TABLE event; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TABLE maevsi.event IS 'An event.';


--
-- Name: COLUMN event.id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.id IS '@omit create,update
The event''s internal id.';


--
-- Name: COLUMN event.author_username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.author_username IS 'The event author''s username.';


--
-- Name: COLUMN event.description; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.description IS 'The event''s description.';


--
-- Name: COLUMN event."end"; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event."end" IS 'The event''s end date and time, with timezone.';


--
-- Name: COLUMN event.invitee_count_maximum; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.invitee_count_maximum IS 'The event''s maximum invitee count.';


--
-- Name: COLUMN event.is_archived; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.is_archived IS 'Indicates whether the event is archived.';


--
-- Name: COLUMN event.is_in_person; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.is_in_person IS 'Indicates whether the event takes place in person.';


--
-- Name: COLUMN event.is_remote; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.is_remote IS 'Indicates whether the event takes place remotely.';


--
-- Name: COLUMN event.location; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.location IS 'The event''s location as it can be shown on a map.';


--
-- Name: COLUMN event.name; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.name IS 'The event''s name.';


--
-- Name: COLUMN event.slug; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.slug IS 'The event''s name, slugified.';


--
-- Name: COLUMN event.start; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.start IS 'The event''s start date and time, with timezone.';


--
-- Name: COLUMN event.url; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.url IS 'The event''s unified resource locator.';


--
-- Name: COLUMN event.visibility; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event.visibility IS 'The event''s visibility.';


--
-- Name: event_delete(bigint, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.event_delete(id bigint, password text) RETURNS maevsi.event
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _current_username TEXT;
  _event_deleted maevsi.event;
BEGIN
  _current_username := current_setting('jwt.claims.username', true)::TEXT;

  IF (EXISTS (SELECT 1 FROM maevsi_private.account WHERE account.username = _current_username AND account.password_hash = maevsi.crypt($2, account.password_hash))) THEN
    DELETE
      FROM maevsi.event
      WHERE
            "event".id = $1
        AND "event".author_username = _current_username
      RETURNING * INTO _event_deleted;

    IF (_event_deleted IS NULL) THEN
      RAISE 'Event not found!' USING ERRCODE = 'no_data_found';
    ELSE
      RETURN _event_deleted;
    END IF;
  ELSE
    RAISE 'Account with given password not found!' USING ERRCODE = 'invalid_password';
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.event_delete(id bigint, password text) OWNER TO postgres;

--
-- Name: FUNCTION event_delete(id bigint, password text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.event_delete(id bigint, password text) IS 'Allows to delete an event.';


--
-- Name: event_invitee_count_maximum(bigint); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.event_invitee_count_maximum(event_id bigint) RETURNS integer
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $_$
BEGIN
  RETURN (
    SELECT "event".invitee_count_maximum
    FROM maevsi.event
    WHERE
      "event".id = $1
      AND ( -- Copied from `event_select` POLICY.
            (
              "event".visibility = 'public'
              AND
              (
                "event".invitee_count_maximum IS NULL
                OR
                "event".invitee_count_maximum > (maevsi.invitee_count(id)) -- Using the function here is required as there would otherwise be infinite recursion.
              )
            )
        OR  "event".author_username = current_setting('jwt.claims.username', true)::TEXT
        OR  "event".id IN (SELECT maevsi_private.events_invited())
      )
  );
END
$_$;


ALTER FUNCTION maevsi.event_invitee_count_maximum(event_id bigint) OWNER TO postgres;

--
-- Name: FUNCTION event_invitee_count_maximum(event_id bigint); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.event_invitee_count_maximum(event_id bigint) IS 'Add a function that returns the maximum invitee count of an accessible event.';


--
-- Name: event_is_existing(text, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.event_is_existing(author_username text, slug text) RETURNS boolean
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $_$
BEGIN
  IF (EXISTS (SELECT 1 FROM maevsi.event WHERE "event".author_username = $1 AND "event".slug = $2)) THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.event_is_existing(author_username text, slug text) OWNER TO postgres;

--
-- Name: FUNCTION event_is_existing(author_username text, slug text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.event_is_existing(author_username text, slug text) IS 'Shows if an event exists.';


--
-- Name: event_unlock(uuid); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.event_unlock(invitation_code uuid) RETURNS maevsi.event_unlock_response
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _jwt_id UUID;
  _jwt maevsi.jwt;
  _event_id BIGINT;
BEGIN
  _jwt_id := current_setting('jwt.claims.id', true)::UUID;
  _jwt := (
    _jwt_id,
    current_setting('jwt.claims.role', true)::TEXT,
    current_setting('jwt.claims.username', true)::TEXT,
    (SELECT ARRAY(SELECT DISTINCT UNNEST(maevsi.invitation_claim_array() || $1) ORDER BY 1)),
    current_setting('jwt.claims.exp', true)::BIGINT
  )::maevsi.jwt;

  UPDATE maevsi_private.jwt
  SET token = _jwt
  WHERE uuid = _jwt_id;

  _event_id := (
    SELECT event_id FROM maevsi.invitation
    WHERE invitation.uuid = $1
  );

  IF (_event_id IS NOT NULL) THEN
    RETURN (SELECT (author_username, slug, _jwt)::maevsi.event_unlock_response
    FROM maevsi.event
    WHERE id = _event_id);
  ELSE
    RAISE 'No event for this invitation code found!' USING ERRCODE = 'no_data_found';
  END IF;
END $_$;


ALTER FUNCTION maevsi.event_unlock(invitation_code uuid) OWNER TO postgres;

--
-- Name: FUNCTION event_unlock(invitation_code uuid); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.event_unlock(invitation_code uuid) IS 'Allows to enter invitation codes.';


--
-- Name: events_organized(); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.events_organized() RETURNS TABLE(event_id bigint)
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $$
BEGIN
  RETURN QUERY
    SELECT id FROM maevsi.event
    WHERE "event".author_username = current_setting('jwt.claims.username', true)::TEXT;
END
$$;


ALTER FUNCTION maevsi.events_organized() OWNER TO postgres;

--
-- Name: FUNCTION events_organized(); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.events_organized() IS 'Add a function that returns all event ids for which the invoker is the author.';


--
-- Name: invitation_claim_array(); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.invitation_claim_array() RETURNS uuid[]
    LANGUAGE plpgsql STABLE STRICT
    AS $$
BEGIN
  RETURN string_to_array(replace(btrim(current_setting('jwt.claims.invitations', true), '[]'), '"', ''), ',')::UUID[];
END
$$;


ALTER FUNCTION maevsi.invitation_claim_array() OWNER TO postgres;

--
-- Name: FUNCTION invitation_claim_array(); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.invitation_claim_array() IS 'Returns the current invitation claims as UUID array.';


--
-- Name: invitation_contact_ids(); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.invitation_contact_ids() RETURNS TABLE(contact_id bigint)
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $$
BEGIN
  RETURN QUERY
    SELECT invitation.contact_id FROM maevsi.invitation
    WHERE uuid = ANY (maevsi.invitation_claim_array())
    OR    event_id IN (SELECT maevsi.events_organized());
END;
$$;


ALTER FUNCTION maevsi.invitation_contact_ids() OWNER TO postgres;

--
-- Name: FUNCTION invitation_contact_ids(); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.invitation_contact_ids() IS 'Returns contact ids that are accessible through invitations.';


--
-- Name: invite(bigint, text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.invite(invitation_id bigint, language text) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _contact RECORD;
  _email_address TEXT;
  _event RECORD;
  _eventAuthorProfilePictureUploadStorageKey TEXT;
  _invitation RECORD;
BEGIN
  -- Invitation UUID
  SELECT * FROM maevsi.invitation INTO _invitation WHERE invitation.id = $1;

  IF (
    _invitation IS NULL
    OR
    _invitation.event_id NOT IN (SELECT maevsi.events_organized()) -- Initial validation, every query below is expected to be secure.
  ) THEN
    RAISE 'Invitation not accessible!' USING ERRCODE = 'no_data_found';
  END IF;

  -- Event
  SELECT * FROM maevsi.event INTO _event WHERE "event".id = _invitation.event_id;

  IF (_event IS NULL) THEN
    RAISE 'Event not accessible!' USING ERRCODE = 'no_data_found';
  END IF;

  -- Contact
  SELECT account_username, email_address FROM maevsi.contact INTO _contact WHERE contact.id = _invitation.contact_id;

  IF (_contact IS NULL) THEN
    RAISE 'Contact not accessible!' USING ERRCODE = 'no_data_found';
  END IF;

  IF (_contact.account_username IS NULL) THEN
    IF (_contact.email_address IS NULL) THEN
      RAISE 'Contact email address not accessible!' USING ERRCODE = 'no_data_found';
    ELSE
      _email_address := _contact.email_address;
    END IF;
  ELSE
    -- Account
    SELECT email_address FROM maevsi_private.account INTO _email_address WHERE account.username = _contact.account_username;

    IF (_email_address IS NULL) THEN
      RAISE 'Account email address not accessible!' USING ERRCODE = 'no_data_found';
    END IF;
  END IF;

  -- Event author profile picture storage key
  SELECT upload_storage_key FROM maevsi.profile_picture INTO _eventAuthorProfilePictureUploadStorageKey WHERE profile_picture.username = _event.author_username;

  INSERT INTO maevsi_private.notification (channel, payload)
    VALUES (
      'event_invitation',
      jsonb_pretty(jsonb_build_object(
        'data', jsonb_build_object(
          'emailAddress', _email_address,
          'event', _event,
          'eventAuthorProfilePictureUploadStorageKey', _eventAuthorProfilePictureUploadStorageKey,
          'invitationUuid', _invitation.uuid
        ),
        'template', jsonb_build_object('language', $2)
      ))
    );
END;
$_$;


ALTER FUNCTION maevsi.invite(invitation_id bigint, language text) OWNER TO postgres;

--
-- Name: FUNCTION invite(invitation_id bigint, language text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.invite(invitation_id bigint, language text) IS 'Adds a notification for the invitation channel.';


--
-- Name: invitee_count(bigint); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.invitee_count(event_id bigint) RETURNS integer
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $_$
BEGIN
  RETURN (SELECT COUNT(1) FROM maevsi.invitation WHERE invitation.event_id = $1);
END;
$_$;


ALTER FUNCTION maevsi.invitee_count(event_id bigint) OWNER TO postgres;

--
-- Name: FUNCTION invitee_count(event_id bigint); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.invitee_count(event_id bigint) IS 'Returns the invitee count for an event.';


--
-- Name: jwt_refresh(uuid); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.jwt_refresh(jwt_id uuid) RETURNS maevsi.jwt
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
  _epoch_now BIGINT := EXTRACT(EPOCH FROM (SELECT date_trunc('second', NOW()::TIMESTAMP)));
  _jwt maevsi.jwt;
BEGIN
  SELECT (token).id, (token).role, (token).username, (token).invitations, (token)."exp" INTO _jwt
  FROM maevsi_private.jwt
  WHERE   uuid = $1
  AND     (token)."exp" >= _epoch_now;

  IF (_jwt IS NULL) THEN
    RETURN NULL;
  ELSE
    UPDATE maevsi_private.jwt
    SET token.exp = EXTRACT(EPOCH FROM ((SELECT date_trunc('second', NOW()::TIMESTAMP)) + COALESCE(current_setting('maevsi.jwt_expiry_duration', true), '1 day')::INTERVAL))
    WHERE uuid = $1;

    UPDATE maevsi_private.account
    SET last_activity = DEFAULT
    WHERE account.username = _jwt.username;

    RETURN (
      SELECT token
      FROM maevsi_private.jwt
      WHERE   uuid = $1
      AND     (token)."exp" >= _epoch_now
    );
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.jwt_refresh(jwt_id uuid) OWNER TO postgres;

--
-- Name: FUNCTION jwt_refresh(jwt_id uuid); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.jwt_refresh(jwt_id uuid) IS 'Refreshes a JWT.';


--
-- Name: notification_acknowledge(bigint, boolean); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.notification_acknowledge(id bigint, is_acknowledged boolean) RETURNS void
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
BEGIN
  IF (EXISTS (SELECT 1 FROM maevsi_private.notification WHERE "notification".id = $1)) THEN
    UPDATE maevsi_private.notification SET is_acknowledged = $2 WHERE "notification".id = $1;
  ELSE
    RAISE 'Notification with given id not found!' USING ERRCODE = 'no_data_found';
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.notification_acknowledge(id bigint, is_acknowledged boolean) OWNER TO postgres;

--
-- Name: FUNCTION notification_acknowledge(id bigint, is_acknowledged boolean); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.notification_acknowledge(id bigint, is_acknowledged boolean) IS 'Allows to set the acknowledgement state of a notification.';


--
-- Name: profile_picture_set(text); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.profile_picture_set(storage_key text) RETURNS void
    LANGUAGE plpgsql STRICT
    AS $_$
BEGIN
  INSERT INTO maevsi.profile_picture(username, upload_storage_key)
  VALUES (
    current_setting('jwt.claims.username', true)::TEXT,
    $1
  )
  ON CONFLICT (username)
  DO UPDATE
  SET upload_storage_key = $1;
END;
$_$;


ALTER FUNCTION maevsi.profile_picture_set(storage_key text) OWNER TO postgres;

--
-- Name: FUNCTION profile_picture_set(storage_key text); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.profile_picture_set(storage_key text) IS 'Sets the picture with the given storage key as the invoker''s profile picture.';


--
-- Name: trigger_invitation_update(); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.trigger_invitation_update() RETURNS trigger
    LANGUAGE plpgsql STRICT
    AS $$
DECLARE
  whitelisted_cols TEXT[] := ARRAY['feedback', 'feedback_paper'];
BEGIN
  IF
      TG_OP = 'UPDATE'
    AND ( -- Invited.
      OLD.uuid = ANY (maevsi.invitation_claim_array())
      OR  OLD.contact_id IN (SELECT id FROM maevsi.contact WHERE contact.account_username = current_setting('jwt.claims.username', true)::TEXT)
    )
    AND
      EXISTS (
        SELECT 1
          FROM jsonb_each(to_jsonb(OLD)) AS pre, jsonb_each(to_jsonb(NEW)) AS post
          WHERE pre.key = post.key AND pre.value IS DISTINCT FROM post.value
          AND NOT (pre.key = ANY(whitelisted_cols))
      )
  THEN
    RAISE 'You''re only allowed to alter these rows: %!', whitelisted_cols USING ERRCODE = 'insufficient_privilege';
  ELSE
    RETURN NEW;
  END IF;
END $$;


ALTER FUNCTION maevsi.trigger_invitation_update() OWNER TO postgres;

--
-- Name: FUNCTION trigger_invitation_update(); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.trigger_invitation_update() IS 'Checks if the caller has permissions to alter the desired columns.';


--
-- Name: upload_create(bigint); Type: FUNCTION; Schema: maevsi; Owner: postgres
--

CREATE FUNCTION maevsi.upload_create(size_byte bigint) RETURNS uuid
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $_$
DECLARE
    _id UUID;
BEGIN
  IF (COALESCE((
    SELECT SUM(upload.size_byte)
    FROM maevsi.upload
    WHERE username = current_setting('jwt.claims.username', true)::TEXT
  ), 0) + $1 <= (
    SELECT upload_quota_bytes
    FROM maevsi_private.account
    WHERE username = current_setting('jwt.claims.username', true)::TEXT
  )) THEN
    INSERT INTO maevsi.upload (username, size_byte)
    VALUES (current_setting('jwt.claims.username', true)::TEXT, $1)
    RETURNING upload.uuid INTO _id;

    RETURN _id;
  ELSE
    RAISE 'Upload quota limit reached!' USING ERRCODE = 'disk_full';
  END IF;
END;
$_$;


ALTER FUNCTION maevsi.upload_create(size_byte bigint) OWNER TO postgres;

--
-- Name: FUNCTION upload_create(size_byte bigint); Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON FUNCTION maevsi.upload_create(size_byte bigint) IS 'Creates an upload with the given size if quota is available.';


--
-- Name: account_email_address_verification_valid_until(); Type: FUNCTION; Schema: maevsi_private; Owner: postgres
--

CREATE FUNCTION maevsi_private.account_email_address_verification_valid_until() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
  BEGIN
    IF (NEW.email_address_verification IS NULL) THEN
      NEW.email_address_verification_valid_until = NULL;
    ELSE
      IF ((OLD IS NULL) OR (OLD.email_address_verification IS DISTINCT FROM NEW.email_address_verification)) THEN
        NEW.email_address_verification_valid_until = (SELECT (NOW() + INTERVAL '1 day')::TIMESTAMP);
      END IF;
    END IF;

    RETURN NEW;
  END;
$$;


ALTER FUNCTION maevsi_private.account_email_address_verification_valid_until() OWNER TO postgres;

--
-- Name: FUNCTION account_email_address_verification_valid_until(); Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON FUNCTION maevsi_private.account_email_address_verification_valid_until() IS 'Sets the valid until column of the email address verification to it''s default value.';


--
-- Name: account_password_reset_verification_valid_until(); Type: FUNCTION; Schema: maevsi_private; Owner: postgres
--

CREATE FUNCTION maevsi_private.account_password_reset_verification_valid_until() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
  BEGIN
    IF (NEW.password_reset_verification IS NULL) THEN
      NEW.password_reset_verification_valid_until = NULL;
    ELSE
      IF ((OLD IS NULL) OR (OLD.password_reset_verification IS DISTINCT FROM NEW.password_reset_verification)) THEN
        NEW.password_reset_verification_valid_until = (SELECT (NOW() + INTERVAL '2 hours')::TIMESTAMP);
      END IF;
    END IF;

    RETURN NEW;
  END;
$$;


ALTER FUNCTION maevsi_private.account_password_reset_verification_valid_until() OWNER TO postgres;

--
-- Name: FUNCTION account_password_reset_verification_valid_until(); Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON FUNCTION maevsi_private.account_password_reset_verification_valid_until() IS 'Sets the valid until column of the email address verification to it''s default value.';


--
-- Name: events_invited(); Type: FUNCTION; Schema: maevsi_private; Owner: postgres
--

CREATE FUNCTION maevsi_private.events_invited() RETURNS TABLE(event_id bigint)
    LANGUAGE plpgsql STABLE STRICT SECURITY DEFINER
    AS $$
BEGIN
  RETURN QUERY
  SELECT invitation.event_id FROM maevsi.invitation
  WHERE
      invitation.contact_id IN (SELECT id FROM maevsi.contact WHERE contact.account_username = current_setting('jwt.claims.username', true)::TEXT) -- The contact selection does not return rows where account_username "IS" null due to the equality comparison.
  OR  invitation.uuid = ANY (maevsi.invitation_claim_array());
END
$$;


ALTER FUNCTION maevsi_private.events_invited() OWNER TO postgres;

--
-- Name: FUNCTION events_invited(); Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON FUNCTION maevsi_private.events_invited() IS 'Add a function that returns all event ids for which the invoker is invited.';


--
-- Name: notify(); Type: FUNCTION; Schema: maevsi_private; Owner: postgres
--

CREATE FUNCTION maevsi_private.notify() RETURNS trigger
    LANGUAGE plpgsql STRICT SECURITY DEFINER
    AS $$
BEGIN
  IF (NEW.is_acknowledged IS NOT TRUE) THEN
    PERFORM pg_notify(
      NEW.channel,
      jsonb_pretty(jsonb_build_object(
          'id', NEW.id,
          'payload', NEW.payload
      ))
    );
  END IF;
  RETURN NEW;
END;
$$;


ALTER FUNCTION maevsi_private.notify() OWNER TO postgres;

--
-- Name: FUNCTION notify(); Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON FUNCTION maevsi_private.notify() IS 'Triggers a pg_notify for the given data.';


--
-- Name: contact; Type: TABLE; Schema: maevsi; Owner: postgres
--

CREATE TABLE maevsi.contact (
    id bigint NOT NULL,
    account_username text,
    address text,
    author_account_username text NOT NULL,
    email_address text,
    email_address_hash text GENERATED ALWAYS AS (md5(lower("substring"(email_address, '\S(?:.*\S)*'::text)))) STORED,
    first_name text,
    last_name text,
    phone_number text,
    url text,
    CONSTRAINT contact_address_check CHECK (((char_length(address) > 0) AND (char_length(address) < 300))),
    CONSTRAINT contact_email_address_check CHECK (((char_length(email_address) < 320) AND (email_address ~ '^.+@.+\..+$'::text) AND (email_address ~ '^[^A-Z]+$'::text))),
    CONSTRAINT contact_first_name_check CHECK (((char_length(first_name) > 0) AND (char_length(first_name) < 100))),
    CONSTRAINT contact_last_name_check CHECK (((char_length(last_name) > 0) AND (char_length(last_name) < 100))),
    CONSTRAINT contact_phone_number_check CHECK ((phone_number ~ '^\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$'::text)),
    CONSTRAINT contact_url_check CHECK (((char_length(url) < 300) AND (url ~ '^https:\/\/'::text)))
);


ALTER TABLE maevsi.contact OWNER TO postgres;

--
-- Name: TABLE contact; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TABLE maevsi.contact IS 'Contact data.';


--
-- Name: COLUMN contact.id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.id IS '@omit create,update
The contact''s internal id.';


--
-- Name: COLUMN contact.account_username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.account_username IS 'The contact account''s username.';


--
-- Name: COLUMN contact.address; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.address IS 'The contact''s physical address.';


--
-- Name: COLUMN contact.author_account_username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.author_account_username IS 'The contact author''s username.';


--
-- Name: COLUMN contact.email_address; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.email_address IS 'The contact''s email address.';


--
-- Name: COLUMN contact.email_address_hash; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.email_address_hash IS '@omit create,update
The contact''s email address''s md5 hash.';


--
-- Name: COLUMN contact.first_name; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.first_name IS 'The contact''s first name.';


--
-- Name: COLUMN contact.last_name; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.last_name IS 'The contact''s last name.';


--
-- Name: COLUMN contact.phone_number; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.phone_number IS 'The contact''s international phone number.';


--
-- Name: COLUMN contact.url; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.contact.url IS 'The contact''s website url.';


--
-- Name: contact_id_seq; Type: SEQUENCE; Schema: maevsi; Owner: postgres
--

CREATE SEQUENCE maevsi.contact_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi.contact_id_seq OWNER TO postgres;

--
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi; Owner: postgres
--

ALTER SEQUENCE maevsi.contact_id_seq OWNED BY maevsi.contact.id;


--
-- Name: event_group; Type: TABLE; Schema: maevsi; Owner: postgres
--

CREATE TABLE maevsi.event_group (
    id bigint NOT NULL,
    author_username text NOT NULL,
    description text,
    is_archived boolean DEFAULT false NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    CONSTRAINT event_group_description_check CHECK ((char_length(description) < 1000000)),
    CONSTRAINT event_group_name_check CHECK (((char_length(name) > 0) AND (char_length(name) < 100))),
    CONSTRAINT event_group_slug_check CHECK (((char_length(slug) < 100) AND (slug ~ '^[-A-Za-z0-9]+$'::text)))
);


ALTER TABLE maevsi.event_group OWNER TO postgres;

--
-- Name: TABLE event_group; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TABLE maevsi.event_group IS 'A group of events.';


--
-- Name: COLUMN event_group.id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_group.id IS '@omit create,update
The event group''s internal id.';


--
-- Name: COLUMN event_group.author_username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_group.author_username IS 'The event group author''s username.';


--
-- Name: COLUMN event_group.description; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_group.description IS 'The event group''s description.';


--
-- Name: COLUMN event_group.is_archived; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_group.is_archived IS 'Indicates whether the event group is archived.';


--
-- Name: COLUMN event_group.name; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_group.name IS 'The event group''s name.';


--
-- Name: COLUMN event_group.slug; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_group.slug IS '@omit create,update
The event group''s name, slugified.';


--
-- Name: event_group_id_seq; Type: SEQUENCE; Schema: maevsi; Owner: postgres
--

CREATE SEQUENCE maevsi.event_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi.event_group_id_seq OWNER TO postgres;

--
-- Name: event_group_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi; Owner: postgres
--

ALTER SEQUENCE maevsi.event_group_id_seq OWNED BY maevsi.event_group.id;


--
-- Name: event_grouping; Type: TABLE; Schema: maevsi; Owner: postgres
--

CREATE TABLE maevsi.event_grouping (
    id bigint NOT NULL,
    event_group_id bigint NOT NULL,
    event_id bigint NOT NULL
);


ALTER TABLE maevsi.event_grouping OWNER TO postgres;

--
-- Name: TABLE event_grouping; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TABLE maevsi.event_grouping IS 'A bidirectional mapping between an event and an event group.';


--
-- Name: COLUMN event_grouping.id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_grouping.id IS '@omit create,update
The event grouping''s internal id.';


--
-- Name: COLUMN event_grouping.event_group_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_grouping.event_group_id IS 'The event grouping''s internal event group id.';


--
-- Name: COLUMN event_grouping.event_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.event_grouping.event_id IS 'The event grouping''s internal event id.';


--
-- Name: event_grouping_id_seq; Type: SEQUENCE; Schema: maevsi; Owner: postgres
--

CREATE SEQUENCE maevsi.event_grouping_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi.event_grouping_id_seq OWNER TO postgres;

--
-- Name: event_grouping_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi; Owner: postgres
--

ALTER SEQUENCE maevsi.event_grouping_id_seq OWNED BY maevsi.event_grouping.id;


--
-- Name: event_id_seq; Type: SEQUENCE; Schema: maevsi; Owner: postgres
--

CREATE SEQUENCE maevsi.event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi.event_id_seq OWNER TO postgres;

--
-- Name: event_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi; Owner: postgres
--

ALTER SEQUENCE maevsi.event_id_seq OWNED BY maevsi.event.id;


--
-- Name: invitation; Type: TABLE; Schema: maevsi; Owner: postgres
--

CREATE TABLE maevsi.invitation (
    id bigint NOT NULL,
    contact_id bigint NOT NULL,
    event_id bigint NOT NULL,
    feedback maevsi.invitation_feedback,
    feedback_paper maevsi.invitation_feedback_paper,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE maevsi.invitation OWNER TO postgres;

--
-- Name: TABLE invitation; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TABLE maevsi.invitation IS 'An invitation for a contact. A bidirectional mapping between an event and a contact.';


--
-- Name: COLUMN invitation.id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.invitation.id IS '@omit create,update
The invitations''s internal id.';


--
-- Name: COLUMN invitation.contact_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.invitation.contact_id IS 'The contact''s internal id for which the invitation is valid.';


--
-- Name: COLUMN invitation.event_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.invitation.event_id IS 'The event''s internal id for which the invitation is valid.';


--
-- Name: COLUMN invitation.feedback; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.invitation.feedback IS 'The invitation''s general feedback status.';


--
-- Name: COLUMN invitation.feedback_paper; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.invitation.feedback_paper IS 'The invitation''s paper feedback status.';


--
-- Name: COLUMN invitation.uuid; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.invitation.uuid IS '@omit create,update
The invitations''s invitation code.';


--
-- Name: invitation_id_seq; Type: SEQUENCE; Schema: maevsi; Owner: postgres
--

CREATE SEQUENCE maevsi.invitation_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi.invitation_id_seq OWNER TO postgres;

--
-- Name: invitation_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi; Owner: postgres
--

ALTER SEQUENCE maevsi.invitation_id_seq OWNED BY maevsi.invitation.id;


--
-- Name: profile_picture; Type: TABLE; Schema: maevsi; Owner: postgres
--

CREATE TABLE maevsi.profile_picture (
    id bigint NOT NULL,
    upload_storage_key text NOT NULL,
    username text NOT NULL
);


ALTER TABLE maevsi.profile_picture OWNER TO postgres;

--
-- Name: TABLE profile_picture; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TABLE maevsi.profile_picture IS 'Mapping of usernames to upload storage keys.';


--
-- Name: COLUMN profile_picture.id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.profile_picture.id IS '@omit create,update
The profile picture''s internal id.';


--
-- Name: COLUMN profile_picture.upload_storage_key; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.profile_picture.upload_storage_key IS 'The upload''s storage key.';


--
-- Name: COLUMN profile_picture.username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.profile_picture.username IS 'The account''s username.';


--
-- Name: profile_picture_id_seq; Type: SEQUENCE; Schema: maevsi; Owner: postgres
--

CREATE SEQUENCE maevsi.profile_picture_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi.profile_picture_id_seq OWNER TO postgres;

--
-- Name: profile_picture_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi; Owner: postgres
--

ALTER SEQUENCE maevsi.profile_picture_id_seq OWNED BY maevsi.profile_picture.id;


--
-- Name: upload; Type: TABLE; Schema: maevsi; Owner: postgres
--

CREATE TABLE maevsi.upload (
    id bigint NOT NULL,
    size_byte bigint NOT NULL,
    storage_key text,
    username text NOT NULL,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL,
    CONSTRAINT upload_size_byte_check CHECK ((size_byte > 0))
);


ALTER TABLE maevsi.upload OWNER TO postgres;

--
-- Name: TABLE upload; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON TABLE maevsi.upload IS 'An upload.';


--
-- Name: COLUMN upload.id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.upload.id IS '@omit create,update
The upload''s internal id.';


--
-- Name: COLUMN upload.size_byte; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.upload.size_byte IS 'The upload''s size in bytes.';


--
-- Name: COLUMN upload.storage_key; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.upload.storage_key IS 'The upload''s storage key.';


--
-- Name: COLUMN upload.username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.upload.username IS 'The uploader''s username.';


--
-- Name: COLUMN upload.uuid; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON COLUMN maevsi.upload.uuid IS 'The upload''s UUID.';


--
-- Name: upload_id_seq; Type: SEQUENCE; Schema: maevsi; Owner: postgres
--

CREATE SEQUENCE maevsi.upload_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi.upload_id_seq OWNER TO postgres;

--
-- Name: upload_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi; Owner: postgres
--

ALTER SEQUENCE maevsi.upload_id_seq OWNED BY maevsi.upload.id;


--
-- Name: account; Type: TABLE; Schema: maevsi_private; Owner: postgres
--

CREATE TABLE maevsi_private.account (
    id bigint NOT NULL,
    created timestamp without time zone DEFAULT now() NOT NULL,
    email_address text NOT NULL,
    email_address_verification uuid DEFAULT gen_random_uuid(),
    email_address_verification_valid_until timestamp without time zone,
    last_activity timestamp without time zone DEFAULT now() NOT NULL,
    password_hash text NOT NULL,
    password_reset_verification uuid,
    password_reset_verification_valid_until timestamp without time zone,
    upload_quota_bytes bigint DEFAULT 10485760 NOT NULL,
    username text NOT NULL,
    CONSTRAINT account_email_address_check CHECK (((char_length(email_address) < 320) AND (email_address ~ '^.+@.+\..+$'::text) AND (email_address ~ '^[^A-Z]+$'::text))),
    CONSTRAINT account_username_check CHECK (((char_length(username) < 100) AND (username ~ '^[-A-Za-z0-9]+$'::text)))
);


ALTER TABLE maevsi_private.account OWNER TO postgres;

--
-- Name: TABLE account; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON TABLE maevsi_private.account IS 'Account data.';


--
-- Name: COLUMN account.id; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.id IS 'The account''s internal id.';


--
-- Name: COLUMN account.created; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.created IS 'Timestamp at which the account was last active.';


--
-- Name: COLUMN account.email_address; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.email_address IS 'The account''s email address for account related information.';


--
-- Name: COLUMN account.email_address_verification; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.email_address_verification IS 'The UUID used to verify an email address, or null if already verified.';


--
-- Name: COLUMN account.email_address_verification_valid_until; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.email_address_verification_valid_until IS 'The timestamp until which an email address verification is valid.';


--
-- Name: COLUMN account.last_activity; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.last_activity IS 'Timestamp at which the account last requested an access token.';


--
-- Name: COLUMN account.password_hash; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.password_hash IS 'The account''s password, hashed and salted.';


--
-- Name: COLUMN account.password_reset_verification; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.password_reset_verification IS 'The UUID used to reset a password, or null if there is no pending reset request.';


--
-- Name: COLUMN account.password_reset_verification_valid_until; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.password_reset_verification_valid_until IS 'The timestamp until which a password reset is valid.';


--
-- Name: COLUMN account.upload_quota_bytes; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.upload_quota_bytes IS 'The account''s upload quota in bytes.';


--
-- Name: COLUMN account.username; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.account.username IS 'The account''s username.';


--
-- Name: account_id_seq; Type: SEQUENCE; Schema: maevsi_private; Owner: postgres
--

CREATE SEQUENCE maevsi_private.account_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi_private.account_id_seq OWNER TO postgres;

--
-- Name: account_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi_private; Owner: postgres
--

ALTER SEQUENCE maevsi_private.account_id_seq OWNED BY maevsi_private.account.id;


--
-- Name: jwt; Type: TABLE; Schema: maevsi_private; Owner: postgres
--

CREATE TABLE maevsi_private.jwt (
    id bigint NOT NULL,
    token maevsi.jwt NOT NULL,
    uuid uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE maevsi_private.jwt OWNER TO postgres;

--
-- Name: TABLE jwt; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON TABLE maevsi_private.jwt IS 'A list of tokens.';


--
-- Name: COLUMN jwt.id; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.jwt.id IS 'The token''s id.';


--
-- Name: COLUMN jwt.token; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.jwt.token IS 'The token.';


--
-- Name: COLUMN jwt.uuid; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.jwt.uuid IS 'The token''s UUID.';


--
-- Name: jwt_id_seq; Type: SEQUENCE; Schema: maevsi_private; Owner: postgres
--

CREATE SEQUENCE maevsi_private.jwt_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi_private.jwt_id_seq OWNER TO postgres;

--
-- Name: jwt_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi_private; Owner: postgres
--

ALTER SEQUENCE maevsi_private.jwt_id_seq OWNED BY maevsi_private.jwt.id;


--
-- Name: notification; Type: TABLE; Schema: maevsi_private; Owner: postgres
--

CREATE TABLE maevsi_private.notification (
    id bigint NOT NULL,
    channel text NOT NULL,
    is_acknowledged boolean,
    payload text NOT NULL,
    "timestamp" timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT notification_payload_check CHECK ((octet_length(payload) <= 8000))
);


ALTER TABLE maevsi_private.notification OWNER TO postgres;

--
-- Name: TABLE notification; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON TABLE maevsi_private.notification IS 'A notification.';


--
-- Name: COLUMN notification.id; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.notification.id IS 'The notification''s internal id.';


--
-- Name: COLUMN notification.channel; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.notification.channel IS 'The notification''s channel.';


--
-- Name: COLUMN notification.is_acknowledged; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.notification.is_acknowledged IS 'Whether the notification was acknowledged.';


--
-- Name: COLUMN notification.payload; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.notification.payload IS 'The notification''s payload.';


--
-- Name: COLUMN notification."timestamp"; Type: COMMENT; Schema: maevsi_private; Owner: postgres
--

COMMENT ON COLUMN maevsi_private.notification."timestamp" IS 'The notification''s timestamp.';


--
-- Name: notification_id_seq; Type: SEQUENCE; Schema: maevsi_private; Owner: postgres
--

CREATE SEQUENCE maevsi_private.notification_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE maevsi_private.notification_id_seq OWNER TO postgres;

--
-- Name: notification_id_seq; Type: SEQUENCE OWNED BY; Schema: maevsi_private; Owner: postgres
--

ALTER SEQUENCE maevsi_private.notification_id_seq OWNED BY maevsi_private.notification.id;


--
-- Name: changes; Type: TABLE; Schema: sqitch; Owner: postgres
--

CREATE TABLE sqitch.changes (
    change_id text NOT NULL,
    script_hash text,
    change text NOT NULL,
    project text NOT NULL,
    note text DEFAULT ''::text NOT NULL,
    committed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    committer_name text NOT NULL,
    committer_email text NOT NULL,
    planned_at timestamp with time zone NOT NULL,
    planner_name text NOT NULL,
    planner_email text NOT NULL
);


ALTER TABLE sqitch.changes OWNER TO postgres;

--
-- Name: TABLE changes; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON TABLE sqitch.changes IS 'Tracks the changes currently deployed to the database.';


--
-- Name: COLUMN changes.change_id; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.change_id IS 'Change primary key.';


--
-- Name: COLUMN changes.script_hash; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.script_hash IS 'Deploy script SHA-1 hash.';


--
-- Name: COLUMN changes.change; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.change IS 'Name of a deployed change.';


--
-- Name: COLUMN changes.project; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.project IS 'Name of the Sqitch project to which the change belongs.';


--
-- Name: COLUMN changes.note; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.note IS 'Description of the change.';


--
-- Name: COLUMN changes.committed_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.committed_at IS 'Date the change was deployed.';


--
-- Name: COLUMN changes.committer_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.committer_name IS 'Name of the user who deployed the change.';


--
-- Name: COLUMN changes.committer_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.committer_email IS 'Email address of the user who deployed the change.';


--
-- Name: COLUMN changes.planned_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.planned_at IS 'Date the change was added to the plan.';


--
-- Name: COLUMN changes.planner_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.planner_name IS 'Name of the user who planed the change.';


--
-- Name: COLUMN changes.planner_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.changes.planner_email IS 'Email address of the user who planned the change.';


--
-- Name: dependencies; Type: TABLE; Schema: sqitch; Owner: postgres
--

CREATE TABLE sqitch.dependencies (
    change_id text NOT NULL,
    type text NOT NULL,
    dependency text NOT NULL,
    dependency_id text,
    CONSTRAINT dependencies_check CHECK ((((type = 'require'::text) AND (dependency_id IS NOT NULL)) OR ((type = 'conflict'::text) AND (dependency_id IS NULL))))
);


ALTER TABLE sqitch.dependencies OWNER TO postgres;

--
-- Name: TABLE dependencies; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON TABLE sqitch.dependencies IS 'Tracks the currently satisfied dependencies.';


--
-- Name: COLUMN dependencies.change_id; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.dependencies.change_id IS 'ID of the depending change.';


--
-- Name: COLUMN dependencies.type; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.dependencies.type IS 'Type of dependency.';


--
-- Name: COLUMN dependencies.dependency; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.dependencies.dependency IS 'Dependency name.';


--
-- Name: COLUMN dependencies.dependency_id; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.dependencies.dependency_id IS 'Change ID the dependency resolves to.';


--
-- Name: events; Type: TABLE; Schema: sqitch; Owner: postgres
--

CREATE TABLE sqitch.events (
    event text NOT NULL,
    change_id text NOT NULL,
    change text NOT NULL,
    project text NOT NULL,
    note text DEFAULT ''::text NOT NULL,
    requires text[] DEFAULT '{}'::text[] NOT NULL,
    conflicts text[] DEFAULT '{}'::text[] NOT NULL,
    tags text[] DEFAULT '{}'::text[] NOT NULL,
    committed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    committer_name text NOT NULL,
    committer_email text NOT NULL,
    planned_at timestamp with time zone NOT NULL,
    planner_name text NOT NULL,
    planner_email text NOT NULL,
    CONSTRAINT events_event_check CHECK ((event = ANY (ARRAY['deploy'::text, 'revert'::text, 'fail'::text, 'merge'::text])))
);


ALTER TABLE sqitch.events OWNER TO postgres;

--
-- Name: TABLE events; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON TABLE sqitch.events IS 'Contains full history of all deployment events.';


--
-- Name: COLUMN events.event; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.event IS 'Type of event.';


--
-- Name: COLUMN events.change_id; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.change_id IS 'Change ID.';


--
-- Name: COLUMN events.change; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.change IS 'Change name.';


--
-- Name: COLUMN events.project; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.project IS 'Name of the Sqitch project to which the change belongs.';


--
-- Name: COLUMN events.note; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.note IS 'Description of the change.';


--
-- Name: COLUMN events.requires; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.requires IS 'Array of the names of required changes.';


--
-- Name: COLUMN events.conflicts; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.conflicts IS 'Array of the names of conflicting changes.';


--
-- Name: COLUMN events.tags; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.tags IS 'Tags associated with the change.';


--
-- Name: COLUMN events.committed_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.committed_at IS 'Date the event was committed.';


--
-- Name: COLUMN events.committer_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.committer_name IS 'Name of the user who committed the event.';


--
-- Name: COLUMN events.committer_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.committer_email IS 'Email address of the user who committed the event.';


--
-- Name: COLUMN events.planned_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.planned_at IS 'Date the event was added to the plan.';


--
-- Name: COLUMN events.planner_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.planner_name IS 'Name of the user who planed the change.';


--
-- Name: COLUMN events.planner_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.events.planner_email IS 'Email address of the user who plan planned the change.';


--
-- Name: projects; Type: TABLE; Schema: sqitch; Owner: postgres
--

CREATE TABLE sqitch.projects (
    project text NOT NULL,
    uri text,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    creator_name text NOT NULL,
    creator_email text NOT NULL
);


ALTER TABLE sqitch.projects OWNER TO postgres;

--
-- Name: TABLE projects; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON TABLE sqitch.projects IS 'Sqitch projects deployed to this database.';


--
-- Name: COLUMN projects.project; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.projects.project IS 'Unique Name of a project.';


--
-- Name: COLUMN projects.uri; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.projects.uri IS 'Optional project URI';


--
-- Name: COLUMN projects.created_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.projects.created_at IS 'Date the project was added to the database.';


--
-- Name: COLUMN projects.creator_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.projects.creator_name IS 'Name of the user who added the project.';


--
-- Name: COLUMN projects.creator_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.projects.creator_email IS 'Email address of the user who added the project.';


--
-- Name: releases; Type: TABLE; Schema: sqitch; Owner: postgres
--

CREATE TABLE sqitch.releases (
    version real NOT NULL,
    installed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    installer_name text NOT NULL,
    installer_email text NOT NULL
);


ALTER TABLE sqitch.releases OWNER TO postgres;

--
-- Name: TABLE releases; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON TABLE sqitch.releases IS 'Sqitch registry releases.';


--
-- Name: COLUMN releases.version; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.releases.version IS 'Version of the Sqitch registry.';


--
-- Name: COLUMN releases.installed_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.releases.installed_at IS 'Date the registry release was installed.';


--
-- Name: COLUMN releases.installer_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.releases.installer_name IS 'Name of the user who installed the registry release.';


--
-- Name: COLUMN releases.installer_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.releases.installer_email IS 'Email address of the user who installed the registry release.';


--
-- Name: tags; Type: TABLE; Schema: sqitch; Owner: postgres
--

CREATE TABLE sqitch.tags (
    tag_id text NOT NULL,
    tag text NOT NULL,
    project text NOT NULL,
    change_id text NOT NULL,
    note text DEFAULT ''::text NOT NULL,
    committed_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    committer_name text NOT NULL,
    committer_email text NOT NULL,
    planned_at timestamp with time zone NOT NULL,
    planner_name text NOT NULL,
    planner_email text NOT NULL
);


ALTER TABLE sqitch.tags OWNER TO postgres;

--
-- Name: TABLE tags; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON TABLE sqitch.tags IS 'Tracks the tags currently applied to the database.';


--
-- Name: COLUMN tags.tag_id; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.tag_id IS 'Tag primary key.';


--
-- Name: COLUMN tags.tag; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.tag IS 'Project-unique tag name.';


--
-- Name: COLUMN tags.project; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.project IS 'Name of the Sqitch project to which the tag belongs.';


--
-- Name: COLUMN tags.change_id; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.change_id IS 'ID of last change deployed before the tag was applied.';


--
-- Name: COLUMN tags.note; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.note IS 'Description of the tag.';


--
-- Name: COLUMN tags.committed_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.committed_at IS 'Date the tag was applied to the database.';


--
-- Name: COLUMN tags.committer_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.committer_name IS 'Name of the user who applied the tag.';


--
-- Name: COLUMN tags.committer_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.committer_email IS 'Email address of the user who applied the tag.';


--
-- Name: COLUMN tags.planned_at; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.planned_at IS 'Date the tag was added to the plan.';


--
-- Name: COLUMN tags.planner_name; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.planner_name IS 'Name of the user who planed the tag.';


--
-- Name: COLUMN tags.planner_email; Type: COMMENT; Schema: sqitch; Owner: postgres
--

COMMENT ON COLUMN sqitch.tags.planner_email IS 'Email address of the user who planned the tag.';


--
-- Name: contact id; Type: DEFAULT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.contact ALTER COLUMN id SET DEFAULT nextval('maevsi.contact_id_seq'::regclass);


--
-- Name: event id; Type: DEFAULT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event ALTER COLUMN id SET DEFAULT nextval('maevsi.event_id_seq'::regclass);


--
-- Name: event_group id; Type: DEFAULT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_group ALTER COLUMN id SET DEFAULT nextval('maevsi.event_group_id_seq'::regclass);


--
-- Name: event_grouping id; Type: DEFAULT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_grouping ALTER COLUMN id SET DEFAULT nextval('maevsi.event_grouping_id_seq'::regclass);


--
-- Name: invitation id; Type: DEFAULT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.invitation ALTER COLUMN id SET DEFAULT nextval('maevsi.invitation_id_seq'::regclass);


--
-- Name: profile_picture id; Type: DEFAULT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.profile_picture ALTER COLUMN id SET DEFAULT nextval('maevsi.profile_picture_id_seq'::regclass);


--
-- Name: upload id; Type: DEFAULT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.upload ALTER COLUMN id SET DEFAULT nextval('maevsi.upload_id_seq'::regclass);


--
-- Name: account id; Type: DEFAULT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.account ALTER COLUMN id SET DEFAULT nextval('maevsi_private.account_id_seq'::regclass);


--
-- Name: jwt id; Type: DEFAULT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.jwt ALTER COLUMN id SET DEFAULT nextval('maevsi_private.jwt_id_seq'::regclass);


--
-- Name: notification id; Type: DEFAULT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.notification ALTER COLUMN id SET DEFAULT nextval('maevsi_private.notification_id_seq'::regclass);


--
-- Name: contact contact_author_account_username_account_username_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.contact
    ADD CONSTRAINT contact_author_account_username_account_username_key UNIQUE (author_account_username, account_username);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: event event_author_username_slug_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event
    ADD CONSTRAINT event_author_username_slug_key UNIQUE (author_username, slug);


--
-- Name: event_group event_group_author_username_slug_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_group
    ADD CONSTRAINT event_group_author_username_slug_key UNIQUE (author_username, slug);


--
-- Name: event_group event_group_pkey; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_group
    ADD CONSTRAINT event_group_pkey PRIMARY KEY (id);


--
-- Name: event_grouping event_grouping_event_id_event_group_id_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_grouping
    ADD CONSTRAINT event_grouping_event_id_event_group_id_key UNIQUE (event_id, event_group_id);


--
-- Name: event_grouping event_grouping_pkey; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_grouping
    ADD CONSTRAINT event_grouping_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: invitation invitation_event_id_contact_id_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.invitation
    ADD CONSTRAINT invitation_event_id_contact_id_key UNIQUE (event_id, contact_id);


--
-- Name: invitation invitation_pkey; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.invitation
    ADD CONSTRAINT invitation_pkey PRIMARY KEY (id);


--
-- Name: invitation invitation_uuid_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.invitation
    ADD CONSTRAINT invitation_uuid_key UNIQUE (uuid);


--
-- Name: profile_picture profile_picture_pkey; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.profile_picture
    ADD CONSTRAINT profile_picture_pkey PRIMARY KEY (id);


--
-- Name: profile_picture profile_picture_username_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.profile_picture
    ADD CONSTRAINT profile_picture_username_key UNIQUE (username);


--
-- Name: upload upload_pkey; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.upload
    ADD CONSTRAINT upload_pkey PRIMARY KEY (id);


--
-- Name: upload upload_storage_key_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.upload
    ADD CONSTRAINT upload_storage_key_key UNIQUE (storage_key);


--
-- Name: upload upload_uuid_key; Type: CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.upload
    ADD CONSTRAINT upload_uuid_key UNIQUE (uuid);


--
-- Name: account account_email_address_key; Type: CONSTRAINT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.account
    ADD CONSTRAINT account_email_address_key UNIQUE (email_address);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: account account_username_key; Type: CONSTRAINT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.account
    ADD CONSTRAINT account_username_key UNIQUE (username);


--
-- Name: jwt jwt_pkey; Type: CONSTRAINT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.jwt
    ADD CONSTRAINT jwt_pkey PRIMARY KEY (id);


--
-- Name: jwt jwt_token_key; Type: CONSTRAINT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.jwt
    ADD CONSTRAINT jwt_token_key UNIQUE (token);


--
-- Name: jwt jwt_uuid_key; Type: CONSTRAINT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.jwt
    ADD CONSTRAINT jwt_uuid_key UNIQUE (uuid);


--
-- Name: notification notification_pkey; Type: CONSTRAINT; Schema: maevsi_private; Owner: postgres
--

ALTER TABLE ONLY maevsi_private.notification
    ADD CONSTRAINT notification_pkey PRIMARY KEY (id);


--
-- Name: changes changes_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.changes
    ADD CONSTRAINT changes_pkey PRIMARY KEY (change_id);


--
-- Name: changes changes_project_script_hash_key; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.changes
    ADD CONSTRAINT changes_project_script_hash_key UNIQUE (project, script_hash);


--
-- Name: dependencies dependencies_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.dependencies
    ADD CONSTRAINT dependencies_pkey PRIMARY KEY (change_id, dependency);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (change_id, committed_at);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (project);


--
-- Name: projects projects_uri_key; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.projects
    ADD CONSTRAINT projects_uri_key UNIQUE (uri);


--
-- Name: releases releases_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.releases
    ADD CONSTRAINT releases_pkey PRIMARY KEY (version);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


--
-- Name: tags tags_project_tag_key; Type: CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_project_tag_key UNIQUE (project, tag);


--
-- Name: idx_event_author_username; Type: INDEX; Schema: maevsi; Owner: postgres
--

CREATE INDEX idx_event_author_username ON maevsi.event USING btree (author_username);


--
-- Name: INDEX idx_event_author_username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON INDEX maevsi.idx_event_author_username IS 'Speeds up reverse foreign key lookups.';


--
-- Name: idx_event_group_author_username; Type: INDEX; Schema: maevsi; Owner: postgres
--

CREATE INDEX idx_event_group_author_username ON maevsi.event_group USING btree (author_username);


--
-- Name: INDEX idx_event_group_author_username; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON INDEX maevsi.idx_event_group_author_username IS 'Speeds up reverse foreign key lookups.';


--
-- Name: idx_event_grouping_event_group_id; Type: INDEX; Schema: maevsi; Owner: postgres
--

CREATE INDEX idx_event_grouping_event_group_id ON maevsi.event_grouping USING btree (event_group_id);


--
-- Name: INDEX idx_event_grouping_event_group_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON INDEX maevsi.idx_event_grouping_event_group_id IS 'Speeds up reverse foreign key lookups.';


--
-- Name: idx_event_grouping_event_id; Type: INDEX; Schema: maevsi; Owner: postgres
--

CREATE INDEX idx_event_grouping_event_id ON maevsi.event_grouping USING btree (event_id);


--
-- Name: INDEX idx_event_grouping_event_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON INDEX maevsi.idx_event_grouping_event_id IS 'Speeds up reverse foreign key lookups.';


--
-- Name: idx_invitation_contact_id; Type: INDEX; Schema: maevsi; Owner: postgres
--

CREATE INDEX idx_invitation_contact_id ON maevsi.invitation USING btree (contact_id);


--
-- Name: INDEX idx_invitation_contact_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON INDEX maevsi.idx_invitation_contact_id IS 'Speeds up reverse foreign key lookups.';


--
-- Name: idx_invitation_event_id; Type: INDEX; Schema: maevsi; Owner: postgres
--

CREATE INDEX idx_invitation_event_id ON maevsi.invitation USING btree (event_id);


--
-- Name: INDEX idx_invitation_event_id; Type: COMMENT; Schema: maevsi; Owner: postgres
--

COMMENT ON INDEX maevsi.idx_invitation_event_id IS 'Speeds up reverse foreign key lookups.';


--
-- Name: invitation maevsi_invitation_update; Type: TRIGGER; Schema: maevsi; Owner: postgres
--

CREATE TRIGGER maevsi_invitation_update BEFORE UPDATE ON maevsi.invitation FOR EACH ROW EXECUTE FUNCTION maevsi.trigger_invitation_update();


--
-- Name: account maevsi_private_account_email_address_verification_valid_until; Type: TRIGGER; Schema: maevsi_private; Owner: postgres
--

CREATE TRIGGER maevsi_private_account_email_address_verification_valid_until BEFORE INSERT OR UPDATE OF email_address_verification ON maevsi_private.account FOR EACH ROW EXECUTE FUNCTION maevsi_private.account_email_address_verification_valid_until();


--
-- Name: account maevsi_private_account_password_reset_verification_valid_until; Type: TRIGGER; Schema: maevsi_private; Owner: postgres
--

CREATE TRIGGER maevsi_private_account_password_reset_verification_valid_until BEFORE INSERT OR UPDATE OF password_reset_verification ON maevsi_private.account FOR EACH ROW EXECUTE FUNCTION maevsi_private.account_password_reset_verification_valid_until();


--
-- Name: notification maevsi_private_notification; Type: TRIGGER; Schema: maevsi_private; Owner: postgres
--

CREATE TRIGGER maevsi_private_notification BEFORE INSERT ON maevsi_private.notification FOR EACH ROW EXECUTE FUNCTION maevsi_private.notify();


--
-- Name: contact contact_account_username_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.contact
    ADD CONSTRAINT contact_account_username_fkey FOREIGN KEY (account_username) REFERENCES maevsi_private.account(username);


--
-- Name: contact contact_author_account_username_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.contact
    ADD CONSTRAINT contact_author_account_username_fkey FOREIGN KEY (author_account_username) REFERENCES maevsi_private.account(username) ON DELETE CASCADE;


--
-- Name: event event_author_username_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event
    ADD CONSTRAINT event_author_username_fkey FOREIGN KEY (author_username) REFERENCES maevsi_private.account(username);


--
-- Name: event_group event_group_author_username_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_group
    ADD CONSTRAINT event_group_author_username_fkey FOREIGN KEY (author_username) REFERENCES maevsi_private.account(username);


--
-- Name: event_grouping event_grouping_event_group_id_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_grouping
    ADD CONSTRAINT event_grouping_event_group_id_fkey FOREIGN KEY (event_group_id) REFERENCES maevsi.event_group(id);


--
-- Name: event_grouping event_grouping_event_id_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.event_grouping
    ADD CONSTRAINT event_grouping_event_id_fkey FOREIGN KEY (event_id) REFERENCES maevsi.event(id);


--
-- Name: invitation invitation_contact_id_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.invitation
    ADD CONSTRAINT invitation_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES maevsi.contact(id);


--
-- Name: invitation invitation_event_id_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.invitation
    ADD CONSTRAINT invitation_event_id_fkey FOREIGN KEY (event_id) REFERENCES maevsi.event(id);


--
-- Name: profile_picture profile_picture_upload_storage_key_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.profile_picture
    ADD CONSTRAINT profile_picture_upload_storage_key_fkey FOREIGN KEY (upload_storage_key) REFERENCES maevsi.upload(storage_key) ON DELETE CASCADE;


--
-- Name: profile_picture profile_picture_username_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.profile_picture
    ADD CONSTRAINT profile_picture_username_fkey FOREIGN KEY (username) REFERENCES maevsi_private.account(username) ON DELETE CASCADE;


--
-- Name: upload upload_username_fkey; Type: FK CONSTRAINT; Schema: maevsi; Owner: postgres
--

ALTER TABLE ONLY maevsi.upload
    ADD CONSTRAINT upload_username_fkey FOREIGN KEY (username) REFERENCES maevsi_private.account(username);


--
-- Name: changes changes_project_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.changes
    ADD CONSTRAINT changes_project_fkey FOREIGN KEY (project) REFERENCES sqitch.projects(project) ON UPDATE CASCADE;


--
-- Name: dependencies dependencies_change_id_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.dependencies
    ADD CONSTRAINT dependencies_change_id_fkey FOREIGN KEY (change_id) REFERENCES sqitch.changes(change_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dependencies dependencies_dependency_id_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.dependencies
    ADD CONSTRAINT dependencies_dependency_id_fkey FOREIGN KEY (dependency_id) REFERENCES sqitch.changes(change_id) ON UPDATE CASCADE;


--
-- Name: events events_project_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.events
    ADD CONSTRAINT events_project_fkey FOREIGN KEY (project) REFERENCES sqitch.projects(project) ON UPDATE CASCADE;


--
-- Name: tags tags_change_id_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_change_id_fkey FOREIGN KEY (change_id) REFERENCES sqitch.changes(change_id) ON UPDATE CASCADE;


--
-- Name: tags tags_project_fkey; Type: FK CONSTRAINT; Schema: sqitch; Owner: postgres
--

ALTER TABLE ONLY sqitch.tags
    ADD CONSTRAINT tags_project_fkey FOREIGN KEY (project) REFERENCES sqitch.projects(project) ON UPDATE CASCADE;


--
-- Name: contact; Type: ROW SECURITY; Schema: maevsi; Owner: postgres
--

ALTER TABLE maevsi.contact ENABLE ROW LEVEL SECURITY;

--
-- Name: contact contact_delete; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY contact_delete ON maevsi.contact FOR DELETE USING ((author_account_username = current_setting('jwt.claims.username'::text, true)));


--
-- Name: contact contact_insert; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY contact_insert ON maevsi.contact FOR INSERT WITH CHECK ((author_account_username = current_setting('jwt.claims.username'::text, true)));


--
-- Name: contact contact_select; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY contact_select ON maevsi.contact FOR SELECT USING (((account_username = current_setting('jwt.claims.username'::text, true)) OR (author_account_username = current_setting('jwt.claims.username'::text, true)) OR (id IN ( SELECT maevsi.invitation_contact_ids() AS invitation_contact_ids))));


--
-- Name: contact contact_update; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY contact_update ON maevsi.contact FOR UPDATE USING ((author_account_username = current_setting('jwt.claims.username'::text, true)));


--
-- Name: event; Type: ROW SECURITY; Schema: maevsi; Owner: postgres
--

ALTER TABLE maevsi.event ENABLE ROW LEVEL SECURITY;

--
-- Name: event_group; Type: ROW SECURITY; Schema: maevsi; Owner: postgres
--

ALTER TABLE maevsi.event_group ENABLE ROW LEVEL SECURITY;

--
-- Name: event_grouping; Type: ROW SECURITY; Schema: maevsi; Owner: postgres
--

ALTER TABLE maevsi.event_grouping ENABLE ROW LEVEL SECURITY;

--
-- Name: event event_insert; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY event_insert ON maevsi.event FOR INSERT WITH CHECK ((author_username = current_setting('jwt.claims.username'::text, true)));


--
-- Name: event event_select; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY event_select ON maevsi.event FOR SELECT USING ((((visibility = 'public'::maevsi.event_visibility) AND ((invitee_count_maximum IS NULL) OR (invitee_count_maximum > maevsi.invitee_count(id)))) OR (author_username = current_setting('jwt.claims.username'::text, true)) OR (id IN ( SELECT maevsi_private.events_invited() AS events_invited))));


--
-- Name: event event_update; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY event_update ON maevsi.event FOR UPDATE USING ((author_username = current_setting('jwt.claims.username'::text, true)));


--
-- Name: invitation; Type: ROW SECURITY; Schema: maevsi; Owner: postgres
--

ALTER TABLE maevsi.invitation ENABLE ROW LEVEL SECURITY;

--
-- Name: invitation invitation_delete; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY invitation_delete ON maevsi.invitation FOR DELETE USING ((event_id IN ( SELECT maevsi.events_organized() AS events_organized)));


--
-- Name: invitation invitation_insert; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY invitation_insert ON maevsi.invitation FOR INSERT WITH CHECK (((event_id IN ( SELECT maevsi.events_organized() AS events_organized)) AND ((maevsi.event_invitee_count_maximum(event_id) IS NULL) OR (maevsi.event_invitee_count_maximum(event_id) > maevsi.invitee_count(event_id))) AND (contact_id IN ( SELECT contact.id
   FROM maevsi.contact
  WHERE (contact.author_account_username = current_setting('jwt.claims.username'::text, true))))));


--
-- Name: invitation invitation_select; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY invitation_select ON maevsi.invitation FOR SELECT USING (((uuid = ANY (maevsi.invitation_claim_array())) OR (contact_id IN ( SELECT contact.id
   FROM maevsi.contact
  WHERE (contact.account_username = current_setting('jwt.claims.username'::text, true)))) OR (event_id IN ( SELECT maevsi.events_organized() AS events_organized))));


--
-- Name: invitation invitation_update; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY invitation_update ON maevsi.invitation FOR UPDATE USING (((uuid = ANY (maevsi.invitation_claim_array())) OR (contact_id IN ( SELECT contact.id
   FROM maevsi.contact
  WHERE (contact.account_username = current_setting('jwt.claims.username'::text, true)))) OR (event_id IN ( SELECT maevsi.events_organized() AS events_organized))));


--
-- Name: profile_picture; Type: ROW SECURITY; Schema: maevsi; Owner: postgres
--

ALTER TABLE maevsi.profile_picture ENABLE ROW LEVEL SECURITY;

--
-- Name: profile_picture profile_picture_delete; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY profile_picture_delete ON maevsi.profile_picture FOR DELETE USING (((( SELECT CURRENT_USER AS "current_user") = 'maevsi_tusd'::name) OR (username = current_setting('jwt.claims.username'::text, true))));


--
-- Name: profile_picture profile_picture_insert; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY profile_picture_insert ON maevsi.profile_picture FOR INSERT WITH CHECK ((username = current_setting('jwt.claims.username'::text, true)));


--
-- Name: profile_picture profile_picture_select; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY profile_picture_select ON maevsi.profile_picture FOR SELECT USING (true);


--
-- Name: profile_picture profile_picture_update; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY profile_picture_update ON maevsi.profile_picture FOR UPDATE USING ((username = current_setting('jwt.claims.username'::text, true)));


--
-- Name: upload; Type: ROW SECURITY; Schema: maevsi; Owner: postgres
--

ALTER TABLE maevsi.upload ENABLE ROW LEVEL SECURITY;

--
-- Name: upload upload_delete_using; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY upload_delete_using ON maevsi.upload FOR DELETE USING ((( SELECT CURRENT_USER AS "current_user") = 'maevsi_tusd'::name));


--
-- Name: upload upload_select_using; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY upload_select_using ON maevsi.upload FOR SELECT USING (((( SELECT CURRENT_USER AS "current_user") = 'maevsi_tusd'::name) OR (username = current_setting('jwt.claims.username'::text, true))));


--
-- Name: upload upload_update_using; Type: POLICY; Schema: maevsi; Owner: postgres
--

CREATE POLICY upload_update_using ON maevsi.upload FOR UPDATE USING ((( SELECT CURRENT_USER AS "current_user") = 'maevsi_tusd'::name));


--
-- Name: SCHEMA maevsi; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA maevsi TO maevsi_anonymous;
GRANT USAGE ON SCHEMA maevsi TO maevsi_account;
GRANT USAGE ON SCHEMA maevsi TO maevsi_tusd;
GRANT USAGE ON SCHEMA maevsi TO maevsi_stomper;


--
-- Name: FUNCTION account_delete(password text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_delete(password text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_delete(password text) TO maevsi_account;


--
-- Name: FUNCTION account_email_address_verification(code uuid); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_email_address_verification(code uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_email_address_verification(code uuid) TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.account_email_address_verification(code uuid) TO maevsi_anonymous;


--
-- Name: FUNCTION account_is_existing(username text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_is_existing(username text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_is_existing(username text) TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.account_is_existing(username text) TO maevsi_anonymous;


--
-- Name: FUNCTION account_password_change(password_current text, password_new text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_password_change(password_current text, password_new text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_password_change(password_current text, password_new text) TO maevsi_account;


--
-- Name: FUNCTION account_password_reset(code uuid, password text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_password_reset(code uuid, password text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_password_reset(code uuid, password text) TO maevsi_anonymous;


--
-- Name: FUNCTION account_password_reset_request(email_address text, language text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_password_reset_request(email_address text, language text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_password_reset_request(email_address text, language text) TO maevsi_anonymous;


--
-- Name: FUNCTION account_registration(username text, email_address text, password text, language text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_registration(username text, email_address text, password text, language text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_registration(username text, email_address text, password text, language text) TO maevsi_anonymous;


--
-- Name: FUNCTION account_registration_refresh(username text, language text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_registration_refresh(username text, language text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_registration_refresh(username text, language text) TO maevsi_anonymous;


--
-- Name: FUNCTION account_upload_quota_bytes(); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.account_upload_quota_bytes() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.account_upload_quota_bytes() TO maevsi_account;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.armor(bytea) FROM PUBLIC;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.armor(bytea, text[], text[]) FROM PUBLIC;


--
-- Name: FUNCTION authenticate(username text, password text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.authenticate(username text, password text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.authenticate(username text, password text) TO maevsi_anonymous;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.crypt(text, text) FROM PUBLIC;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.dearmor(text) FROM PUBLIC;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.decrypt(bytea, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.decrypt_iv(bytea, bytea, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.digest(bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.digest(text, text) FROM PUBLIC;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.encrypt(bytea, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.encrypt_iv(bytea, bytea, bytea, text) FROM PUBLIC;


--
-- Name: TABLE event; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE maevsi.event TO maevsi_account;
GRANT SELECT ON TABLE maevsi.event TO maevsi_anonymous;


--
-- Name: FUNCTION event_delete(id bigint, password text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.event_delete(id bigint, password text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.event_delete(id bigint, password text) TO maevsi_account;


--
-- Name: FUNCTION event_invitee_count_maximum(event_id bigint); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.event_invitee_count_maximum(event_id bigint) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.event_invitee_count_maximum(event_id bigint) TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.event_invitee_count_maximum(event_id bigint) TO maevsi_anonymous;


--
-- Name: FUNCTION event_is_existing(author_username text, slug text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.event_is_existing(author_username text, slug text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.event_is_existing(author_username text, slug text) TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.event_is_existing(author_username text, slug text) TO maevsi_anonymous;


--
-- Name: FUNCTION event_unlock(invitation_code uuid); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.event_unlock(invitation_code uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.event_unlock(invitation_code uuid) TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.event_unlock(invitation_code uuid) TO maevsi_anonymous;


--
-- Name: FUNCTION events_organized(); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.events_organized() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.events_organized() TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.events_organized() TO maevsi_anonymous;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.gen_random_bytes(integer) FROM PUBLIC;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.gen_random_uuid() FROM PUBLIC;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.gen_salt(text) FROM PUBLIC;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.gen_salt(text, integer) FROM PUBLIC;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.hmac(bytea, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.hmac(text, text, text) FROM PUBLIC;


--
-- Name: FUNCTION invitation_claim_array(); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.invitation_claim_array() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.invitation_claim_array() TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.invitation_claim_array() TO maevsi_anonymous;


--
-- Name: FUNCTION invitation_contact_ids(); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.invitation_contact_ids() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.invitation_contact_ids() TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.invitation_contact_ids() TO maevsi_anonymous;


--
-- Name: FUNCTION invite(invitation_id bigint, language text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.invite(invitation_id bigint, language text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.invite(invitation_id bigint, language text) TO maevsi_account;


--
-- Name: FUNCTION invitee_count(event_id bigint); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.invitee_count(event_id bigint) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.invitee_count(event_id bigint) TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.invitee_count(event_id bigint) TO maevsi_anonymous;


--
-- Name: FUNCTION jwt_refresh(jwt_id uuid); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.jwt_refresh(jwt_id uuid) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.jwt_refresh(jwt_id uuid) TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.jwt_refresh(jwt_id uuid) TO maevsi_anonymous;


--
-- Name: FUNCTION notification_acknowledge(id bigint, is_acknowledged boolean); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.notification_acknowledge(id bigint, is_acknowledged boolean) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.notification_acknowledge(id bigint, is_acknowledged boolean) TO maevsi_stomper;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_armor_headers(text, OUT key text, OUT value text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_key_id(bytea) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_decrypt(bytea, bytea) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_decrypt(bytea, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_decrypt(bytea, bytea, text, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_decrypt_bytea(bytea, bytea) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_decrypt_bytea(bytea, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_decrypt_bytea(bytea, bytea, text, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_encrypt(text, bytea) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_encrypt(text, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_encrypt_bytea(bytea, bytea) FROM PUBLIC;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_pub_encrypt_bytea(bytea, bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_decrypt(bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_decrypt(bytea, text, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_decrypt_bytea(bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_decrypt_bytea(bytea, text, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_encrypt(text, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_encrypt(text, text, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_encrypt_bytea(bytea, text) FROM PUBLIC;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.pgp_sym_encrypt_bytea(bytea, text, text) FROM PUBLIC;


--
-- Name: FUNCTION profile_picture_set(storage_key text); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.profile_picture_set(storage_key text) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.profile_picture_set(storage_key text) TO maevsi_account;


--
-- Name: FUNCTION trigger_invitation_update(); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.trigger_invitation_update() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.trigger_invitation_update() TO maevsi_account;
GRANT ALL ON FUNCTION maevsi.trigger_invitation_update() TO maevsi_anonymous;


--
-- Name: FUNCTION upload_create(size_byte bigint); Type: ACL; Schema: maevsi; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi.upload_create(size_byte bigint) FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi.upload_create(size_byte bigint) TO maevsi_account;


--
-- Name: FUNCTION account_email_address_verification_valid_until(); Type: ACL; Schema: maevsi_private; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi_private.account_email_address_verification_valid_until() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi_private.account_email_address_verification_valid_until() TO maevsi_account;


--
-- Name: FUNCTION account_password_reset_verification_valid_until(); Type: ACL; Schema: maevsi_private; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi_private.account_password_reset_verification_valid_until() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi_private.account_password_reset_verification_valid_until() TO maevsi_account;


--
-- Name: FUNCTION events_invited(); Type: ACL; Schema: maevsi_private; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi_private.events_invited() FROM PUBLIC;
GRANT ALL ON FUNCTION maevsi_private.events_invited() TO maevsi_account;
GRANT ALL ON FUNCTION maevsi_private.events_invited() TO maevsi_anonymous;


--
-- Name: FUNCTION notify(); Type: ACL; Schema: maevsi_private; Owner: postgres
--

REVOKE ALL ON FUNCTION maevsi_private.notify() FROM PUBLIC;


--
-- Name: TABLE contact; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE maevsi.contact TO maevsi_account;
GRANT SELECT ON TABLE maevsi.contact TO maevsi_anonymous;


--
-- Name: SEQUENCE contact_id_seq; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT USAGE ON SEQUENCE maevsi.contact_id_seq TO maevsi_account;


--
-- Name: TABLE event_group; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE maevsi.event_group TO maevsi_account;
GRANT SELECT ON TABLE maevsi.event_group TO maevsi_anonymous;


--
-- Name: SEQUENCE event_group_id_seq; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT USAGE ON SEQUENCE maevsi.event_group_id_seq TO maevsi_account;


--
-- Name: TABLE event_grouping; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE maevsi.event_grouping TO maevsi_account;
GRANT SELECT ON TABLE maevsi.event_grouping TO maevsi_anonymous;


--
-- Name: SEQUENCE event_grouping_id_seq; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT USAGE ON SEQUENCE maevsi.event_grouping_id_seq TO maevsi_account;


--
-- Name: SEQUENCE event_id_seq; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT USAGE ON SEQUENCE maevsi.event_id_seq TO maevsi_account;


--
-- Name: TABLE invitation; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE maevsi.invitation TO maevsi_account;
GRANT SELECT,UPDATE ON TABLE maevsi.invitation TO maevsi_anonymous;


--
-- Name: SEQUENCE invitation_id_seq; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT USAGE ON SEQUENCE maevsi.invitation_id_seq TO maevsi_account;


--
-- Name: TABLE profile_picture; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE maevsi.profile_picture TO maevsi_account;
GRANT SELECT ON TABLE maevsi.profile_picture TO maevsi_anonymous;
GRANT SELECT,DELETE ON TABLE maevsi.profile_picture TO maevsi_tusd;


--
-- Name: SEQUENCE profile_picture_id_seq; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT USAGE ON SEQUENCE maevsi.profile_picture_id_seq TO maevsi_account;


--
-- Name: TABLE upload; Type: ACL; Schema: maevsi; Owner: postgres
--

GRANT SELECT ON TABLE maevsi.upload TO maevsi_account;
GRANT SELECT,DELETE,UPDATE ON TABLE maevsi.upload TO maevsi_tusd;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres REVOKE ALL ON FUNCTIONS  FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

