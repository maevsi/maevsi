#!/bin/sh

set -e

THIS=$(dirname "$(readlink -f "$0")")

create() {
    NAME="$1"
    shift
    CONTENT=$*

    path="$THIS/.nuxt/$NAME"
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
  if [ ! -d "$THIS/.nuxt" ]; then
    mkdir "$THIS/.nuxt"
  fi

  if ! ls "$THIS"/.nuxt/*.key 1> /dev/null 2>&1 || ! ls "$THIS"/.nuxt/*.crt 1> /dev/null 2>&1; then
    mkcert -install
    create "localhost" "localhost" "127.0.0.1" "0.0.0.0"
  fi

  sslCert="$THIS/.nuxt/localhost.crt"
  sslKey="$THIS/.nuxt/localhost.key"
fi

nuxi dev --https --ssl-cert "$sslCert" --ssl-key "$sslKey"
