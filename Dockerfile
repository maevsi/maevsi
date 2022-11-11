#############
# Serve Nuxt in development mode.

# Should be the specific version of `node:slim`.
# `sqitch` requires at least `buster`.
FROM node:19.0.0-slim@sha256:f87456d191c00b6f3fa58e61ba8fc93bbad8bd4a08f3cc04051d8083a090c6d2 AS development

COPY ./docker/entrypoint.sh /usr/local/bin/

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

ENV CERTIFICATE_PATH=/srv/certificates/maevsi
ENV NODE_OPTIONS="--max-old-space-size=4096 --openssl-legacy-provider"

VOLUME /srv/.pnpm-store
VOLUME /srv/app
VOLUME /srv/sqitch

ENTRYPOINT ["entrypoint.sh"]
CMD ["pnpm", "run", "dev"]

# Waiting for https://github.com/nuxt/framework/issues/6915
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:19.0.0-slim@sha256:f87456d191c00b6f3fa58e61ba8fc93bbad8bd4a08f3cc04051d8083a090c6d2 AS prepare

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
FROM node:19.0.0-slim@sha256:f87456d191c00b6f3fa58e61ba8fc93bbad8bd4a08f3cc04051d8083a090c6d2 AS build

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
FROM node:19.0.0-slim@sha256:f87456d191c00b6f3fa58e61ba8fc93bbad8bd4a08f3cc04051d8083a090c6d2 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN npm install -g pnpm && \
    pnpm run lint


########################
# Nuxt: test (unit)

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:19.0.0-slim@sha256:f87456d191c00b6f3fa58e61ba8fc93bbad8bd4a08f3cc04051d8083a090c6d2 AS test-unit

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN npm install -g pnpm && \
    pnpm run test:unit


########################
# Nuxt: test (integration)

# Should be the specific version of `cypress/included`.
FROM cypress/included:10.11.0@sha256:5518700396412daedc8cd082ac52206d40e353fc26e949bff573d740304aed98 AS test-integration_base

ARG UNAME=cypress
ARG UID=1000
ARG GID=1000

WORKDIR /srv/app/

# Update and install dependencies.
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl ca-certificates libnss3-tools` are required by `mkcert`
        curl ca-certificates libnss3-tools \
    # pnpm
    && npm install -g pnpm \
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -u $UID -g $GID -o -s /bin/bash $UNAME \
    # mkcert
    && curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64" \
    && chmod +x mkcert-v*-linux-amd64 \
    && cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert \
    && mkcert -install \
    # && mkdir -p /home/$UNAME/.local/share/mkcert \
    # && mv /root/.local/share/mkcert /home/$UNAME/.local/share/ \
    # && chown $UNAME:$UNAME /home/$UNAME/.local/share/mkcert -R \
    # clean
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

USER $UNAME

VOLUME /srv/app


########################
# Nuxt: test (integration)

# Should be the specific version of `cypress/included`.
FROM cypress/included:10.11.0@sha256:5518700396412daedc8cd082ac52206d40e353fc26e949bff573d740304aed98 AS test-integration

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
    && cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert

COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=build /srv/app/ /srv/app/

WORKDIR /srv/app/

RUN pnpm test:integration:prod \
    && pnpm test:integration:dev


#######################
# Collect build, lint and test results.

# Should be the specific version of node:slim.
FROM node:19.0.0-slim@sha256:f87456d191c00b6f3fa58e61ba8fc93bbad8bd4a08f3cc04051d8083a090c6d2 AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
COPY --from=test-unit /srv/app/package.json /tmp/test/package.json
COPY --from=test-integration /srv/app/package.json /tmp/test/package.json

#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of node:slim.
# `sqitch` requires at least `buster`.
FROM node:19.0.0-slim@sha256:f87456d191c00b6f3fa58e61ba8fc93bbad8bd4a08f3cc04051d8083a090c6d2 AS production

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
COPY ./docker/entrypoint.sh /usr/local/bin/

ENTRYPOINT ["entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
