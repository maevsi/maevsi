#############
# Serve Nuxt in development mode.

# Should be the specific version of `node:slim`.
# `sqitch` requires at least `buster`.
FROM node:18.10.0-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1 AS development

COPY ./docker-entrypoint.sh /usr/local/bin/

# Update and install dependencies.
# - `libdbd-pg-perl postgresql-client sqitch` is required by the entrypoint
# - `ca-certificates git` is required by npm dependencies from GitHub (dargmuesli/nuxt-i18n-module)
# - `curl`, `ca-certificates libnss3-tools` and `mkcert` provide the certificates for secure connections
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        libdbd-pg-perl postgresql-client sqitch \
        curl \
        ca-certificates git \
        ca-certificates libnss3-tools \
    && curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" \
    && chmod +x mkcert-v*-linux-amd64 \
    && cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm

WORKDIR /srv/app/

ENV NODE_OPTIONS="--max-old-space-size=4096 --openssl-legacy-provider"

ENV DOCKER=true

VOLUME /srv/.pnpm-store
VOLUME /srv/app
VOLUME /srv/sqitch

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "dev"]

# Waiting for https://github.com/nuxt/framework/issues/6915
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:18.10.0-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1 AS prepare

WORKDIR /srv/app/

COPY ./nuxt/pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm fetch

COPY ./nuxt/ ./

RUN pnpm install --offline \
  && pnpm nuxi prepare


########################
# Build Nuxt.

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:18.10.0-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1 AS build

ARG CI=false
ENV CI ${CI}
ARG NUXT_PUBLIC_STACK_DOMAIN=maev.si
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}
ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN npm install -g pnpm && \
    pnpm run build


########################
# Nuxt: lint

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:18.10.0-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN npm install -g pnpm && \
    pnpm run lint


########################
# Nuxt: test (unit)

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:18.10.0-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1 AS test-unit

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN npm install -g pnpm && \
    pnpm run test:unit


########################
# Nuxt: test (integration)

# Should be the specific version of `cypress/included`.
FROM cypress/included:10.9.0@sha256:de9f7c27905a7d6127b134653ecbe092c7cdc9248272283ba87e5f42aa3fc693 AS test-integration_base

# ENV DEBUG="start-server-and-test"

WORKDIR /srv/app/

# Update and install dependencies.
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl ca-certificates libnss3-tools` are required by `mkcert`
        curl ca-certificates libnss3-tools \
    # pnpm
    && npm install -g pnpm \
    # mkcert
    && curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" \
    && chmod +x mkcert-v*-linux-amd64 \
    && cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert \
    && mkcert -install \
    && mkdir -p /home/node/.local/share/mkcert \
    && mv /root/.local/share/mkcert /home/node/.local/share/ \
    && chown node:node /home/node/.local/share/mkcert -R \
    # clean
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

VOLUME /srv/app


########################
# Nuxt: test (integration)

# Should be the specific version of `cypress/included`.
FROM cypress/included:10.9.0@sha256:de9f7c27905a7d6127b134653ecbe092c7cdc9248272283ba87e5f42aa3fc693 AS test-integration

# Update and install dependencies.
# - `curl ca-certificates libnss3-tools` and `mkcert` provide the certificates for secure connections
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl ca-certificates libnss3-tools \
    && curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" \
    && chmod +x mkcert-v*-linux-amd64 \
    && cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert

WORKDIR /srv/app/

COPY --from=build /srv/app/ ./

RUN npm install -g pnpm && \
    pnpm test:integration:prod && \
    pnpm test:integration:dev


#######################
# Collect build, lint and test results.

# Should be the specific version of node:slim.
FROM node:18.10.0-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1 AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
COPY --from=test-unit /srv/app/package.json /tmp/test/package.json
COPY --from=test-integration /srv/app/package.json /tmp/test/package.json
# COPY --from=test-visual /srv/app/package.json /tmp/test-visual/package.json

#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of node:slim.
# `sqitch` requires at least `buster`.
FROM node:18.10.0-slim@sha256:d900c28d8cbb51cee5473215e5941b6334d9b02da75ef60f490d4c0c13160bb1 AS production

ENV NODE_ENV=production

# Update and install dependencies.
# - `libdbd-pg-perl postgresql-client sqitch` is required by the entrypoint
# - `wget` is required by the healthcheck
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        libdbd-pg-perl postgresql-client sqitch \
        wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY --from=collect /srv/app/ ./

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
