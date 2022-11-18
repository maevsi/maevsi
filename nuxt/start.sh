#!/bin/bash

set -e

THIS=$(dirname "$(readlink -f "$0")")
CERTIFICATES_DIRECTORY="$THIS/.certificates"

create() {
    NAME="$1"
    shift
    CONTENT=$*

    path="$CERTIFICATES_DIRECTORY/$NAME"
    certfile="$path.crt"
    keyfile="$path.key"

    # shellcheck disable=SC2086
    mkcert \
        -cert-file "$certfile" \
        -ecdsa \
        -key-file "$keyfile" $CONTENT

    cat "$(mkcert -CAROOT)/rootCA.pem" >> "$certfile"
}

if [ "$CERTIFICATE_PATH" != "" ]; then
  sslCert="$CERTIFICATE_PATH.crt"
  sslKey="$CERTIFICATE_PATH.key"
else
  if [ ! -d "$CERTIFICATES_DIRECTORY" ]; then
    mkdir "$CERTIFICATES_DIRECTORY"
  fi

  if [ "$DOCKER" != "true" ] && ( ! ls "$CERTIFICATES_DIRECTORY"/*.key 1> /dev/null 2>&1 || ! ls "$CERTIFICATES_DIRECTORY"/*.crt 1> /dev/null 2>&1 ); then
    mkcert -install || true
    create "localhost" "localhost" "127.0.0.1" "0.0.0.0"
  fi

  sslCert="$CERTIFICATES_DIRECTORY/localhost.crt"
  sslKey="$CERTIFICATES_DIRECTORY/localhost.key"
fi

if [ "$NODE_ENV" = "production" ]; then
  sslCertFile=$(cat "$sslCert")
  sslKeyFile=$(cat "$sslKey")
  export NITRO_SSL_CERT=$sslCertFile
  export NITRO_SSL_KEY=$sslKeyFile

  node .output/server/index.mjs
else
  nuxi dev --https --ssl-cert "$sslCert" --ssl-key "$sslKey"
fi
