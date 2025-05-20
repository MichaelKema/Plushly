#!/usr/bin/env bash
# run-dev.sh — loads .env and starts Spring Boot

# 1. auto-export all vars from .env
set -o allexport

# 2. source the file (must be in the same folder)
source .env

# 3. stop auto-export
set +o allexport

# 4. optional sanity check (uncomment to debug)
# echo "DB_URL=$DB_URL"
# echo "DB_USER=$DB_USER"

# 5. launch your app (skip tests)
./mvnw spring-boot:run -DskipTests
