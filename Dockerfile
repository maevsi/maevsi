#############
# Serve Nuxt in development mode.

# Should be the specific version of `node:slim`.
# `sqitch` requires at least `buster`.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS development

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
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS prepare

WORKDIR /srv/app/

COPY ./nuxt/package.json ./nuxt/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./nuxt/ ./
RUN yarn nuxi prepare


########################
# Build Nuxt.

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS install

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile


########################
# Build Nuxt.

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS build

ARG CI=false
ENV CI ${CI}
ARG NUXT_ENV_STACK_DOMAIN=maev.si
ENV NUXT_ENV_STACK_DOMAIN=${NUXT_ENV_STACK_DOMAIN}

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

ENV NODE_ENV=production
RUN yarn run build


########################
# Nuxt: lint

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS lint

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN yarn run lint


########################
# Nuxt: test (code)

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS test

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN yarn run test:code


########################
# Nuxt: test (integration)

# Should be the specific version of `node:slim`.
# Could be the specific version of `node:alpine`, but the `prepare` stage uses slim too.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS test-integration

# Update and install dependencies.
# - `wget` is used for testing
# - `procps` is required by `start-server-and-test` on `debian:slim` (https://github.com/bahmutov/start-server-and-test/issues/132#issuecomment-448581335)
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        wget \
        procps

WORKDIR /srv/app/

COPY --from=build /srv/app/ ./

RUN WAIT_ON_TIMEOUT=6000 yarn start-server-and-test 'yarn start' 3000 'wget http://0.0.0.0:3000/'


########################
# Nuxt: test (visual)

# Should be the specific version of node:slim.
# `storycap` requires Debian.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS test-visual

# Update and install dependencies.
# - `fonts-dejavu-core gconf-service`, ... is required by `puppeteer`
# - `procps` is required by `start-server-and-test` on `debian:slim` (https://github.com/bahmutov/start-server-and-test/issues/132#issuecomment-448581335)
# - `jq` is required for storycap
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        fonts-dejavu-core gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdbus-1-3 libdrm2 libgbm1 libgconf-2-4 libgtk-3-0 libnspr4 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libxrandr2 libxss1 libxtst6 fonts-liberation libappindicator1 libnss3 libxshmfence1 lsb-release xdg-utils \
        procps \
        jq

WORKDIR /srv/app/

COPY --from=prepare /srv/app/ ./

RUN yarn run test:visual


########################
# Nuxt: test (visual, standalone)

# Should be the specific version of node:slim.
# `storycap` requires Debian.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS test-visual_standalone

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
# Collect build, lint and test results.

# Should be the specific version of node:slim.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS collect

WORKDIR /srv/app/

COPY --from=build /srv/app/.output ./.output
COPY --from=lint /srv/app/package.json /tmp/lint/package.json
COPY --from=test /srv/app/package.json /tmp/test/package.json
COPY --from=test-integration /srv/app/package.json /tmp/test/package.json
COPY --from=test-visual /srv/app/package.json /tmp/test-visual/package.json

#######################
# Provide a web server.
# Requires node (cannot be static) as the server acts as backend too.

# Should be the specific version of node:slim.
# `sqitch` requires at least `buster`.
FROM node:16.16.0-slim@sha256:67ac68a9452c8e174d508babe0e99e0580a6c73ba8b1998cf2b5c80cdda38217 AS production

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
CMD ["start"]
HEALTHCHECK --interval=10s CMD wget -O /dev/null http://localhost:3000/api/healthcheck || exit 1
