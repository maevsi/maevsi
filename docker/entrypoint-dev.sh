#!/bin/sh
set -e

pnpm config set store-dir /srv/.pnpm-store
pnpm install

exec "$@"
