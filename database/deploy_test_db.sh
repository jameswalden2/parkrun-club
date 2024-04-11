#!/bin/bash

POSTGRES_PASSWORD=${TEST_PG_PASSWORD:-password}
POSTGRES_DB=${TEST_PG_DB_NAME:-po10-postgres}

docker run -d -p ${TEST_PG_PORT:-5432}:5432 --name $POSTGRES_DB -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD postgres:latest

for f in ./ddl/*.sql;
do
    psql $POSTGRES_DB postgres -f "$f"
done