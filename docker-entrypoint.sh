#!/bin/sh
set -e

# extract all secrets referenced as env vars MY_VAR_SECRETSFILE to MY_VAR
for var in $(env | cut -d'=' -f1); do
  # Check if the variable name ends with _SECRETSFILE
  if [ "$(echo "$var" | grep "_SECRETSFILE$")" ]; then
    # Extract the base variable name (without _SECRETSFILE suffix)
    base_var="$(echo "$var" | sed 's/_SECRETSFILE$//')"

    # Check if the base variable is not already set
    if [ -z "$(eval echo \"\$$base_var\")" ]; then
      # Get the file path from the variable
      file_path="$(eval echo \"\$$var\")"

      echo "Populate secret: '$base_var' from '$file_path'."

      # Check if the file exists
      if [ -f "$file_path" ]; then
        # Read the content of the file and set it to the base variable
        export "$base_var"="$(cat "$file_path")"
      else
        echo "Warning: File '$file_path' specified by '$var' does not exist."
      fi
    fi
  fi
done

pnpm config set store-dir "/srv/.pnpm-store"
pnpm install
pnpm rebuild -r

exec "$@"
