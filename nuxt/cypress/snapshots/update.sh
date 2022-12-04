#!/bin/bash

set -e

files=$(find cypress/snapshots/actual -regex ".*-actual.png")

for file in $files; do
  new="${file//-actual.png/-base.png}"

  # shellcheck disable=SC2206
  newArr=(${new//\// })
  newArrLength="${#newArr[@]}"

  mkdir -p "cypress/snapshots/base/${newArr[newArrLength-2]}"
  mv "$file" "cypress/snapshots/base/${newArr[newArrLength-2]}/${newArr[newArrLength-1]}"
done
