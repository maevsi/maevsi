#!/bin/bash
set -e

THIS=$(dirname "$(readlink -f "$0")")

files=$(find "$THIS/actual" -type f -not -regex ".*(failed)\.png")

for file in $files; do
  # shellcheck disable=SC2206
  fileArr=(${file//\// })
  fileArrLength="${#fileArr[@]}"

  mkdir -p "$THIS/base/${fileArr[fileArrLength-2]}"
  mv "$file" "$THIS/base/${fileArr[fileArrLength-2]}/${fileArr[fileArrLength-1]}"
done
