#############
# Serve Nuxt in development mode.

FROM node:20.4.0-alpine@sha256:7c7522c24296574017a8e78227870808573b7ca9991dea6164469a0336e9aa4f AS development

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY ./docker-entrypoint.sh /usr/local/bin/

RUN corepack enable

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "dev"]
EXPOSE 3000

# TODO: support healthcheck while starting (https://github.com/nuxt/framework/issues/6915)
# HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM node:20.4.0-alpine@sha256:7c7522c24296574017a8e78227870808573b7ca9991dea6164469a0336e9aa4f AS prepare

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

FROM node:20.4.0-alpine@sha256:7c7522c24296574017a8e78227870808573b7ca9991dea6164469a0336e9aa4f AS build

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

FROM node:20.4.0-alpine@sha256:7c7522c24296574017a8e78227870808573b7ca9991dea6164469a0336e9aa4f AS lint

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run lint


########################
# Nuxt: test (unit)

FROM node:20.4.0-alpine@sha256:7c7522c24296574017a8e78227870808573b7ca9991dea6164469a0336e9aa4f AS test-unit

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN corepack enable && \
    pnpm run test --run


########################
# Nuxt: test (e2e)

FROM mcr.microsoft.com/playwright:v1.36.1@sha256:d4f2a74c3b7900142e22f0c5f84ede54a44a97a865c14a3b1714b24a083b4bda AS test-e2e_base

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
    # user
    && groupadd -g $GID -o $UNAME \
    && useradd -m -l -u $UID -g $GID -o -s /bin/bash $UNAME

USER $UNAME

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]


########################
# Nuxt: test (preparation)

FROM mcr.microsoft.com/playwright:v1.36.1@sha256:d4f2a74c3b7900142e22f0c5f84ede54a44a97a865c14a3b1714b24a083b4bda AS test-e2e-prepare

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

RUN corepack enable

COPY --from=prepare /srv/app/ ./

RUN pnpm rebuild


########################
# Nuxt: test (e2e, development)

FROM mcr.microsoft.com/playwright:v1.36.1@sha256:d4f2a74c3b7900142e22f0c5f84ede54a44a97a865c14a3b1714b24a083b4bda AS test-e2e-dev

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=development

WORKDIR /srv/app/

RUN corepack enable

COPY --from=test-e2e-prepare /srv/app/ ./

RUN pnpm run test:e2e:dev


########################
# Nuxt: test (e2e, production)

FROM mcr.microsoft.com/playwright:v1.36.1@sha256:d4f2a74c3b7900142e22f0c5f84ede54a44a97a865c14a3b1714b24a083b4bda AS test-e2e-prod

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN corepack enable

COPY --from=test-e2e-prepare /srv/app/ ./
COPY --from=build /srv/app/.output /srv/app/.output

# # Do not run in parallel with `test-e2e-dev`
# COPY --from=test-e2e-dev /srv/app/package.json /tmp/test/package.json

RUN pnpm run test:e2e:prod


#######################
# Collect build, lint and test results.

FROM node:20.4.0-alpine@sha256:7c7522c24296574017a8e78227870808573b7ca9991dea6164469a0336e9aa4f AS collect

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

FROM node:20.4.0-alpine@sha256:7c7522c24296574017a8e78227870808573b7ca9991dea6164469a0336e9aa4f AS production

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV NODE_ENV=production

WORKDIR /srv/app/

# Update dependencies.
RUN apk update && apk upgrade --no-cache

COPY --from=collect /srv/app/ ./

CMD [".output/server/index.mjs"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3001/api/healthcheck || exit 1
EXPOSE 3001
