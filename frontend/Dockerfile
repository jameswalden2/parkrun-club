ARG NODE_VERSION=20-alpine

# stage 1: build
FROM node:${NODE_VERSION} as builder

WORKDIR /build

COPY frontend/package.json ./
RUN npm install

COPY frontend/ .

# stage 2: run dev mode
FROM node:${NODE_VERSION}

WORKDIR /app

COPY --from=builder /build/ /app/

CMD ["npm", "run", "dev"]
