#############
# Serve Nuxt in development mode.

FROM node:20.1.0-alpine AS development

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY ./docker-entrypoint.sh /usr/local/bin/

RUN corepack enable

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

COPY ./package.json ./.npmrc ./

RUN pnpm install --offline

COPY ./ ./

RUN pnpm run prepare


########################
# Build Nuxt.

FROM node:20.1.0-alpine AS build

ARG NUXT_PUBLIC_STACK_DOMAIN=maev.si
ENV NUXT_PUBLIC_STACK_DOMAIN=${NUXT_PUBLIC_STACK_DOMAIN}

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN corepack enable && \
    pnpm run build


########################
# Nuxt: lint

FROM node:20.1.0-alpine AS lint

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run lint


########################
# Nuxt: test (unit)

FROM node:20.1.0-alpine AS test-unit

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

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

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY ./docker-entrypoint.sh /usr/local/bin/

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl` is required by `cypress/snapshots/test.sh`
        curl \
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -l -u $UID -g $GID -o -s /bin/bash $UNAME

USER $UNAME

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]


########################
# Nuxt: test (preparation)

FROM cypress/included:12.11.0 AS test-integration-prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN corepack enable

COPY --from=prepare /srv/app/ ./

RUN pnpm rebuild


########################
# Nuxt: test (integration, development)

FROM cypress/included:12.11.0 AS test-integration-dev

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl` is required by `cypress/snapshots/test.sh`
        curl \
    && corepack enable

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=test-integration-prepare /srv/app/ ./

RUN pnpm run test:integration:dev


########################
# Nuxt: test (integration, production)

FROM cypress/included:12.11.0 AS test-integration-prod

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl` is required by `cypress/snapshots/test.sh`
        curl \
    && corepack enable

# Use the Cypress version installed by pnpm, not as provided by the Docker image.
COPY --from=prepare /root/.cache/Cypress /root/.cache/Cypress
COPY --from=test-integration-prepare /srv/app/ ./
COPY --from=build /srv/app/.output /srv/app/.output

# Do not run in parallel with `test-integration-dev`
COPY --from=test-integration-dev /srv/app/package.json /tmp/test/package.json

RUN pnpm run test:integration:prod


#######################
# Collect build, lint and test results.

FROM node:20.1.0-alpine AS collect

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=build /srv/app/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/package.json
COPY --from=test-unit /srv/app/package.json /tmp/package.json
COPY --from=test-integration-dev /srv/app/package.json /tmp/package.json
COPY --from=test-integration-prod /srv/app/package.json /tmp/package.json


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

FROM node:20.1.0-alpine AS production

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=production

WORKDIR /srv/app/

# Update dependencies.
RUN apk update && apk upgrade --no-cache

COPY --from=collect /srv/app/ ./

CMD [".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
