#!/bin/sh

THIS=$(dirname "$(readlink -f "$0")")

result=$(cat "$THIS"/working-directory/out.json)
deletedItems=$(echo "$result" | jq -r '.deletedItems[]')
failedItems=$(echo "$result" | jq -r '.failedItems[]')
newItems=$(echo "$result" | jq -r '.newItems[]')

if [ "$deletedItems" = "" ]; then
  printf "deleted: none\n\n"
else
  printf "deleted:\n%s\n\n" "$deletedItems"

  echo "$deletedItems" | while read -r p; do
    rm "$THIS/images/expected/$p"
  done
fi

if [ "$failedItems" = "" ]; then
  printf "failed: none\n\n"
else
  printf "failed:\n%s\n\n" "$failedItems"

  echo "$failedItems" | while read -r p; do
    cp "$THIS/images/actual/$p" "$THIS/images/expected/$p"
  done
fi

if [ "$newItems" = "" ]; then
  printf "new: none\n\n"
else
  printf "new:\n%s\n\n" "$newItems"

  echo "$newItems" | while read -r p; do
    mkdir -p "$(dirname "$THIS/images/expected/$p")"
    cp "$THIS/images/actual/$p" "$THIS/images/expected/$p"
  done
fi
