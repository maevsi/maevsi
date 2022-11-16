#!/bin/bash

set -e

files=$(find test/cypress/snapshots/actual -regex ".*-actual.png")

for file in $files; do
  new="${file//-actual.png/-base.png}"

  # shellcheck disable=SC2206
  newArr=(${new//\// })
  newArrLength="${#newArr[@]}"

  mv "$file" "test/cypress/snapshots/base/${newArr[newArrLength-2]}/${newArr[newArrLength-1]}"
done
