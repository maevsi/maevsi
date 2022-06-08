#############
# Serve Nuxt in development mode.

# Should be the specific version of `node:slim`.
# `sqitch` requires at least `buster`.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS development

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

COPY ./docker-entrypoint.sh /usr/local/bin/

VOLUME /srv/app
VOLUME /srv/sqitch

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["dev"]
HEALTHCHECK --interval=10s --start-period=60s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1


########################
# Prepare Nuxt.

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS prepare

WORKDIR /srv/app/

COPY ./nuxt/package.json ./nuxt/yarn.lock ./

RUN yarn install

COPY ./nuxt/ ./
RUN yarn nuxi prepare


########################
# Build Nuxt.

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS build

ARG CI=false
ENV CI ${CI}
ARG NUXT_ENV_STACK_DOMAIN=maev.si
ENV NUXT_ENV_STACK_DOMAIN=${NUXT_ENV_STACK_DOMAIN}

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN yarn run build \
    # Discard devDependencies.
    && yarn install


########################
# Nuxt: lint

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN yarn run lint


########################
# Nuxt: test (code)

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS test

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN yarn run test:code


########################
# Nuxt: test (visual)

# Should be the specific version of node:slim.
# `storycap` requires Debian.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS test-visual

# Update and install dependencies.
# - `fonts-dejavu-core gconf-service`, ... is required by `puppeteer`
# - `procps` is required by `start-server-and-test` on `debian:slim` (https://github.com/bahmutov/start-server-and-test/issues/132#issuecomment-448581335)
# - `jq` is required for storycap
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        fonts-dejavu-core gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgconf-2-4 libgtk-3-0 libnspr4 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libxrandr2 libxss1 libxtst6 fonts-liberation libappindicator1 libnss3 libxshmfence1 lsb-release xdg-utils \
        procps \
        jq \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN yarn run test:visual


########################
# Nuxt: test (visual, standalone)

# Should be the specific version of node:slim.
# `storycap` requires Debian.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS test-visual_standalone

# Update and install dependencies.
# - `fonts-dejavu-core gconf-service`, ... is required by `puppeteer`
# - `procps` is required by `start-server-and-test` on `debian:slim` (https://github.com/bahmutov/start-server-and-test/issues/132#issuecomment-448581335)
# - `jq` is required for storycap
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        fonts-dejavu-core gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgconf-2-4 libgtk-3-0 libnspr4 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libxrandr2 libxss1 libxtst6 fonts-liberation libappindicator1 libnss3 libxshmfence1 lsb-release xdg-utils \
        procps \
        jq \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /srv/app/

CMD ["yarn", "run", "storycap"]


#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of node:slim.
# `sqitch` requires at least `buster`.
FROM node:16.15.0-slim@sha256:989dc486196a861f0ccc6c72f2eb7a5d3edb3451f2325bb8e81702ae42ed40e1 AS production

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

COPY --from=build /srv/app/ ./

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["start"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
