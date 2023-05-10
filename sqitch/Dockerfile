###########################
FROM postgres:15.2 AS build

ENV POSTGRES_DB=maevsi
ENV POSTGRES_PASSWORD=postgres

WORKDIR /srv/app

RUN apt-get update \
  && apt-get install --no-install-recommends -y \
      libdbd-pg-perl postgresql-client sqitch

COPY ./ ./

RUN export SQITCH_TARGET="$(cat SQITCH_TARGET.env)" \
  && docker-entrypoint.sh postgres & \
  while ! pg_isready -h localhost -U postgres -p 5432; do sleep 1; done \
  && sqitch deploy -t db:pg://postgres:postgres@/maevsi \
  && pg_dump -s -h localhost -U postgres -p 5432 maevsi > schema.sql

##############################
FROM alpine:3.18.0 AS validate

WORKDIR /srv/app

COPY --from=build /srv/app ./

RUN diff schema.sql schema.definition.sql


##############################
FROM sqitch/sqitch AS production

WORKDIR /srv/app

COPY --from=validate /srv/app ./

CMD deploy "$(cat /run/secrets/maevsi_sqitch-target)"
