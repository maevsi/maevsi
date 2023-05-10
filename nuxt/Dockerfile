#############
# Serve Nuxt in development mode.

FROM node:20.1.0-alpine AS development

COPY ./docker-entrypoint.sh /usr/local/bin/

RUN corepack enable

WORKDIR /srv/app/

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "dev"]

# TODO: support healthcheck while starting (https://github.com/nuxt/framework/issues/6915)
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM node:20.1.0-alpine AS prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY ./pnpm-lock.yaml ./

RUN corepack enable && \
    pnpm fetch

COPY ./ ./

RUN pnpm install --offline


########################
# Build Nuxt.

FROM node:20.1.0-alpine AS build

ARG CI=false
ENV CI ${CI}
ARG NUXT_PUBLIC_STACK_DOMAIN=maev.si
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN corepack enable && \
    pnpm run build


########################
# Nuxt: lint

FROM node:20.1.0-alpine AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run lint


########################
# Nuxt: test (unit)

FROM node:20.1.0-alpine AS test-unit

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run test --run


########################
# Nuxt: test (integration)

FROM cypress/included:12.11.0 AS test-integration_base

ARG UNAME=cypress
ARG UID=1000
ARG GID=1000

WORKDIR /srv/app/

COPY ./docker-entrypoint.sh /usr/local/bin/

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -l -u $UID -g $GID -o -s /bin/bash $UNAME

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare --chown=$UNAME /root/.cache/Cypress /root/.cache/Cypress

USER $UNAME

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]


########################
# Nuxt: test (integration, development)

FROM cypress/included:12.11.0 AS test-integration-dev

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        curl

WORKDIR /srv/app/

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=prepare /srv/app/ ./

RUN pnpm run test:integration:dev


########################
# Nuxt: test (integration, production)

FROM cypress/included:12.11.0 AS test-integration-prod

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        curl

WORKDIR /srv/app/

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=build /srv/app/ /srv/app/
COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json

RUN pnpm run test:integration:prod


#######################
# Collect build, lint and test results.

FROM node:20.1.0-alpine AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/nuxt/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/package.json
COPY --from=test-unit /srv/app/package.json /tmp/package.json
COPY --from=test-integration-dev /srv/app/package.json /tmp/package.json
COPY --from=test-integration-prod /srv/app/package.json /tmp/package.json


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

FROM node:20.1.0-alpine AS production

ENV NODE_ENV=production

# Update and install dependencies.
# - `wget` is required by the healthcheck
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY --from=collect /srv/app/ ./

COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", ".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
