#!/bin/sh

set -e

THIS=$(dirname "$(readlink -f "$0")")

rm -rf "$THIS"/working-directory/actual/*
pnpm run storycap:actual
rm -rf "$THIS"/working-directory/expected/*
mkdir -p "$THIS"/working-directory/expected
cp -r "$THIS"/images/expected/* "$THIS"/working-directory/expected
pnpm reg-suit compare

if [ "$CI" = "true" ]; then
  pnpm reg-suit publish -n
fi

result=$(cat "$THIS"/working-directory/out.json)
deletedItems=$(echo "$result" | jq -r '.deletedItems')
failedItems=$(echo "$result" | jq -r '.failedItems')
newItems=$(echo "$result" | jq -r '.newItems')

if [ "$deletedItems" = "[]" ]; then
  printf "deleted: none\n\n"
else
  printf "deleted:\n%s\n\n" "$deletedItems"
fi

if [ "$failedItems" = "[]" ]; then
  printf "failed: none\n\n"
else
  printf "failed:\n%s\n\n" "$failedItems"
fi

if [ "$newItems" = "[]" ]; then
  printf "new: none\n\n"
else
  printf "new:\n%s\n\n" "$newItems"
fi

if [ "$newItems" != "[]" ] || [ "$failedItems" != "[]" ] || [ "$newItems" != "[]" ]; then
  exit 1
fi
