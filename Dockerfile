# syntax=docker/dockerfile:1
# check=skip=SecretsUsedInArgOrEnv

#############
# Create base image.

FROM node:22.14.0-alpine AS base-image

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true

WORKDIR /srv/app/

RUN apk update \
    && apk add --no-cache \
      git \
    && apk add --no-cache --repository=https://dl-cdn.alpinelinux.org/alpine/edge/testing \
      mkcert \
    && npm install -g corepack@latest \
    # TODO: remove (https://github.com/nodejs/corepack/issues/612)
    && corepack enable

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

#############
# Serve Nuxt in development mode.

FROM base-image AS development

VOLUME /srv/.pnpm-store
VOLUME /srv/app

USER node

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "--dir", "src", "dev", "--host"]
EXPOSE 3000

# TODO: support healthcheck while starting (https://github.com/nuxt/framework/issues/6915)
# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

FROM base-image AS prepare

COPY ./pnpm-lock.yaml ./package.json ./

## pnpm patches
# COPY ./patches ./patches

RUN pnpm fetch

COPY ./ ./

RUN pnpm install --offline


########################
# Build for Node deployment.

FROM prepare AS build-node

ARG RELEASE_NAME
ENV RELEASE_NAME=${RELEASE_NAME}
ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}

ENV NODE_ENV=production
RUN pnpm --dir src run build:node


# ########################
# # Build for static deployment.

# FROM prepare AS build-static

# ARG SITE_URL=https://localhost:3002
# ENV SITE_URL=${SITE_URL}

# ENV NODE_ENV=production
# RUN pnpm --dir src run build:static


########################
# Nuxt: lint

FROM prepare AS lint

RUN pnpm -r run lint


########################
# Nuxt: test (unit)

FROM prepare AS test-unit

RUN pnpm -r run test


########################
# Nuxt: test (e2e, base-image)

FROM mcr.microsoft.com/playwright:v1.51.0 AS test-e2e-base-image

# The `CI` environment variable must be set for pnpm to run in headless mode
ENV CI=true
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

WORKDIR /srv/app/

RUN npm install -g corepack@latest \
    # TODO: remove (https://github.com/nodejs/corepack/issues/612)
    && corepack enable \
    && apt update && apt install mkcert


########################
# Nuxt: test (e2e)

FROM test-e2e-base-image AS test-e2e_development

ARG UNAME=e2e
ARG UID=1000
ARG GID=1000

ENV NODE_ENV=development

COPY ./docker-entrypoint.sh /usr/local/bin/

RUN groupadd -g $GID -o $UNAME \
    && useradd -m -l -u $UID -g $GID -o -s /bin/bash $UNAME

USER $UNAME

VOLUME /srv/.pnpm-store
VOLUME /srv/app

ENTRYPOINT ["docker-entrypoint.sh"]


########################
# Nuxt: test (e2e, preparation)

FROM test-e2e-base-image AS test-e2e-prepare

COPY --from=prepare /srv/app/ ./

RUN pnpm -r rebuild


# ########################
# # Nuxt: test (e2e, development)

# FROM test-e2e-prepare AS test-e2e-dev

# ENV NODE_ENV=development

# RUN pnpm --dir tests run test:e2e:server:dev


########################
# Nuxt: test (e2e, node)

FROM test-e2e-prepare AS test-e2e-node

COPY --from=build-node /srv/app/src/.output ./src/.output

RUN pnpm --dir tests run test:e2e:server:node


# ########################
# # Nuxt: test (e2e, static)

# FROM test-e2e-prepare AS test-e2e-static

# COPY --from=build-static /srv/app/src/.output/public ./src/.output/public

# RUN pnpm --dir tests run test:e2e:server:static


#######################
# Collect build, lint and test results.

FROM base-image AS collect

COPY --from=build-node --chown=node /srv/app/src/.output ./.output
COPY --from=build-node --chown=node /srv/app/src/package.json ./package.json
# COPY --from=build-static /srv/app/package.json /dev/null
COPY --from=lint /srv/app/package.json /dev/null
COPY --from=test-unit /srv/app/package.json /dev/null
# COPY --from=test-e2e-dev /srv/app/package.json /dev/null
COPY --from=test-e2e-node /srv/app/package.json /dev/null
# COPY --from=test-e2e-static /srv/app/package.json /dev/null


# #######################
# # Provide a web server.

# FROM nginx:1.25.2-alpine AS production

# WORKDIR /usr/share/nginx/html

# COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# COPY --from=collect /srv/app/.output/public/ ./

# HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
# EXPOSE 3000


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

FROM collect AS production

ENV NODE_ENV=production

# Update dependencies.
RUN apk update \
    && apk upgrade --no-cache

USER node

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["pnpm", "run", "start:node"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
EXPOSE 3000
LABEL org.opencontainers.image.source="https://github.com/maevsi/vibetype"
LABEL org.opencontainers.image.description="Find events, guests and friends 💙❤️💚"
