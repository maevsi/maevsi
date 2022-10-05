#!/bin/sh

THIS=$(dirname "$(readlink -f "$0")")

sslCert="$THIS/../../maevsi_stack/src/development/certificates/localhost.crt"
sslKey="$THIS/../../maevsi_stack/src/development/certificates/localhost.key"

if [ -n "$DOCKER" ]; then
  sslCert="/srv/certificates/maevsi.crt"
  sslKey="/srv/certificates/maevsi.key"
fi

nuxi dev --https --ssl-cert "$sslCert" --ssl-key "$sslKey"
