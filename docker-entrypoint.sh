#!/bin/sh
set -e

sqitch -C /srv/sqitch/ deploy $(cat /run/secrets/maevsi_sqitch-target)

exec gridsome "$@"