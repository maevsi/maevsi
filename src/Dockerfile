#############
# Serve Nuxt in development mode.

FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 AS development

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

FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 AS prepare

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

FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 AS build

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

FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 AS lint

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run lint


########################
# Nuxt: test (unit)

FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 AS test-unit

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run test --run


########################
# Nuxt: test (e2e)

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e_base

ARG UNAME=e2e
ARG UID=1000
ARG GID=1000

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=development
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

COPY ./docker-entrypoint.sh /usr/local/bin/

RUN corepack enable \
    && apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl` is required by `tests/e2e/screenshots/test.sh`
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

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e-prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

RUN corepack enable

COPY --from=prepare /srv/app/ ./

RUN pnpm rebuild


########################
# Nuxt: test (e2e, development)

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e-dev

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=development

WORKDIR /srv/app/

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl` is required by `tests/e2e/screenshots/test.sh`
        curl \
    && corepack enable

COPY --from=test-e2e-prepare /srv/app/ ./

RUN pnpm run test:e2e:dev


########################
# Nuxt: test (e2e, production)

FROM mcr.microsoft.com/playwright:v1.34.2@sha256:d6cc296a938177cfaae55c8428c68ab81d143b2c54d2d1872136411228dbec20 AS test-e2e-prod

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        # `curl` is required by `tests/e2e/screenshots/test.sh`
        curl \
    && corepack enable

COPY --from=test-e2e-prepare /srv/app/ ./
COPY --from=build /srv/app/.output /srv/app/.output

# # Do not run in parallel with `test-e2e-dev`
# COPY --from=test-e2e-dev /srv/app/package.json /tmp/test/package.json

RUN pnpm run test:e2e:prod


#######################
# Collect build, lint and test results.

FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 AS collect

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=build /srv/app/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/package.json
COPY --from=test-unit /srv/app/package.json /tmp/package.json
COPY --from=test-e2e-dev /srv/app/package.json /tmp/package.json
COPY --from=test-e2e-prod /srv/app/package.json /tmp/package.json


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

FROM node:20.2.0-alpine@sha256:f25b0e9d3d116e267d4ff69a3a99c0f4cf6ae94eadd87f1bf7bd68ea3ff0bef7 AS production

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=production

WORKDIR /srv/app/

# Update dependencies.
RUN apk update && apk upgrade --no-cache

COPY --from=collect /srv/app/ ./

CMD [".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
