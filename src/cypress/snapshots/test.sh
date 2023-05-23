#!/bin/sh

THIS=$(dirname "$(readlink -f "$0")")

if [ -d "$THIS/diff" ]; then
  rm -rf "$THIS/diff"
fi

pnpm cypress run --env type=actual --browser chrome
ERROR=$?

files=$(find "$THIS/diff" -type f || 'true')

if [ -n "$CI" ]; then
  for file in $files; do
    echo "@$file"
    curl -i -F file="@$file" "https://tmpfiles.org/api/v1/upload"
    printf "\n"
    break
  done
fi

exit "$ERROR"
