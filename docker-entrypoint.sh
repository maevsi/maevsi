#!/bin/sh
set -e

sqitch -C /srv/sqitch/ deploy "$(cat /run/secrets/maevsi_sqitch-target)"

if hash nuxt 2>/dev/null
then
    exec nuxt "$@"
else
    exec nginx -g "daemon off;"
fi