############
# Serve Vue.

# Should be the specific version of node:buster-slim.
FROM node:13.1.0-buster-slim@sha256:aa3f6c49eeb2b4270c7c397cd05c1754e278d912bdcb23591bda3531616c0ef5 AS development

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

# Should be the specific version of node:current-slim.
FROM node:13.1.0-stretch-slim@sha256:f5ae196a043965ee4dd2d94c242c7ef2582a2c19814ea27d68141b9ee7ffba68 AS build

WORKDIR /srv/app/

COPY --from=development /srv/app/ /srv/app/

RUN yarn build


#######################
# Provide a web server.
# Only the compiled app, ready for production with Nginx.

# Should be the specific version of nginx:stable.
FROM nginx:1.17.6-alpine@sha256:2993f9c9a619cde706ae0e34a1a91eb9cf5225182b6b76eb637392d2ce816538 AS production

COPY --from=build /srv/app/dist/ /usr/share/nginx/html/

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
