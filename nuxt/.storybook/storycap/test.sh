#!/bin/bash

THIS=$(dirname "$(readlink -f "$0")")

yarn storycap:actual
rm -rf "$THIS"/working-directory/expected/*
mkdir -p "$THIS"/working-directory/expected
cp -r "$THIS"/images/expected/* "$THIS"/working-directory/expected
yarn reg-suit compare

if [[ -n "$CI" ]]; then
  yarn reg-suit publish -n
fi

result=$(cat "$THIS"/working-directory/out.json)
deletedItems=$(echo "$result" | jq -r '.deletedItems')
failedItems=$(echo "$result" | jq -r '.failedItems')
newItems=$(echo "$result" | jq -r '.newItems')

if [ "$deletedItems" = "[]" ]; then
  printf "deleted: none\n\n"
else
  printf "deleted:\n%s\n\n" "$deletedItems"
  exit 1
fi

if [ "$failedItems" = "[]" ]; then
  printf "failed: none\n\n"
else
  printf "failed:\n%s\n\n" "$failedItems"
  exit 1
fi

if [ "$newItems" = "[]" ]; then
  printf "new: none\n\n"
else
  printf "new:\n%s\n\n" "$newItems"
  exit 1
fi
