############
# Serve Vue.

# Not below `buster`!
FROM node:13.13.0-buster-slim@sha256:e21f4309c3b764f2197fd60566478f5870507bb891d32ccdd6174747ddd7437f AS development

# Update and install build dependencies
# - `git` is required by the `yarn` command
RUN \
    apt-get update && \
    apt-get install -y git

# Install gridsome.
RUN yarn global add @gridsome/cli

WORKDIR /srv/app/

COPY ./gridsome/ /srv/app/

RUN yarn

# Install sqitch.
RUN apt-get update && apt-get -y install libdbd-pg-perl postgresql-client sqitch

COPY ./sqitch/ /srv/sqitch/
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["develop"]


########################
# Build and compile Vue.

FROM node:13.13.0-slim@sha256:6b7f44457be3b4414aa9d48f740cfab0c0afdfa2301b2f90816934711aaef7d2 AS build

ARG GRIDSOME_STACK_DOMAIN=maev.si
ENV GRIDSOME_STACK_DOMAIN=${GRIDSOME_STACK_DOMAIN}
ENV NODE_ENV=production

WORKDIR /srv/app/

COPY --from=development /srv/app/ /srv/app/

RUN yarn build


#######################
# Provide a web server.
# Only the compiled app, ready for production with Nginx.

# Should be the specific version of nginx:stable.
FROM nginx:1.17.9@sha256:30d9dde0c4cb5ab4989a92bc2c235b995dfa88ff86c09232f309b6ad27f1c7cd AS production

# Install sqitch.
RUN apt-get update && apt-get -y install libdbd-pg-perl postgresql-client sqitch

COPY --from=build /srv/app/dist/ /usr/share/nginx/html/

COPY ./sqitch/ /srv/sqitch/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]