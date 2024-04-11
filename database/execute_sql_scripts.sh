#!/bin/bash
# Stop on error
set -e

# Wait for Postgres to start
echo "Waiting for postgres..."

while ! pg_isready -q -h localhost -p 5432 -U postgres
do
  echo "$(date) - waiting for database to start"
  sleep 2
done

# Execute SQL scripts
for file in /var/lib/postgresql/sql_scripts/*.sql; do
    psql -U postgres -f "$file"
done