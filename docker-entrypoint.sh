#!/bin/sh
set -e

pnpm config set store-dir "/srv/.pnpm-store"
pnpm install
pnpm rebuild -r

exec "$@"
