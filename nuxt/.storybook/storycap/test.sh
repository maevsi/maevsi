#!/bin/bash

THIS=$(dirname "$(readlink -f "$0")")

yarn storycap:actual
rm -rf "$THIS"/working-directory/expected/*
cp -r "$THIS"/images/expected/* "$THIS"/working-directory/expected
yarn reg-suit compare

result=$(cat "$THIS"/working-directory/out.json)
deletedItemCount=$(echo "$result" | jq -r '.deletedItems | length')
failedItemCount=$(echo "$result" | jq -r '.failedItems | length')
newItemCount=$(echo "$result" | jq -r '.newItems | length')

if [[ "$deletedItemCount" != "0" || "$failedItemCount" != "0" || "$newItemCount" != "0" ]]; then
  exit 1
fi
