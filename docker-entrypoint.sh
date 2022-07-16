#!/bin/sh
set -e

sqitch -C /srv/sqitch/ deploy "$(cat /run/secrets/maevsi_sqitch-target)"

pnpm config set store-dir "/srv/.pnpm-store"
pnpm i

exec "$@"
