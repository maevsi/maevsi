#!/bin/sh
set -e

sqitch -C /srv/sqitch/ deploy $(cat /run/secrets/maevsi_sqitch-target)

if hash gridsome 2>/dev/null
then
    exec gridsome "$@"
else
    exec nginx -g "daemon off;"
fi