#!/bin/sh

THIS=$(dirname "$(readlink -f "$0")")
image=maevsi/sqitch

docker build -t $image --progress plain "$THIS"

id=$(docker create $image)
docker cp "$id:/srv/schema.sql" "$THIS/schema.sql"
docker rm -v "$id"
