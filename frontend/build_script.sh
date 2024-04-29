#!/bin/bash

export POSTGRES_PRISMA_URL="postgresql://postgres:example@builddb:5432/parkrunclub"
export POSTGRES_URL_NON_POOLING="postgresql://postgres:example@builddb:5432/parkrunclub"

npx prisma migrate dev --name db_init --schema ./src/prisma/schema.prisma

npx prisma generate --schema ./src/prisma/schema.prisma

npm run build

echo "WE HERE!"