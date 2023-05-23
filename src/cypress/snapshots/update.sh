#!/bin/bash

set -e

files=$(find cypress/snapshots/actual -type f -not -regex ".*(failed)\.png")

for file in $files; do
  # shellcheck disable=SC2206
  fileArr=(${file//\// })
  fileArrLength="${#fileArr[@]}"

  mkdir -p "cypress/snapshots/base/${fileArr[fileArrLength-2]}"
  mv "$file" "cypress/snapshots/base/${fileArr[fileArrLength-2]}/${fileArr[fileArrLength-1]}"
done
