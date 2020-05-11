-- Deploy maevsi:function_regexp_escape to pg
-- requires: schema_public

BEGIN;

CREATE FUNCTION maevsi.regexp_escape(TEXT)
  RETURNS TEXT AS $$
    SELECT regexp_replace($1, '([!$()*+.:<=>?[\\\]^{|}-])', '\\\1', 'g')
$$ LANGUAGE SQL IMMUTABLE STRICT PARALLEL SAFE;

COMMENT ON FUNCTION maevsi.regexp_escape(TEXT) IS 'Escapes all characters in a string, which have a special meaning in regular expressions.';

COMMIT;
