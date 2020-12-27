[![build status](https://github.com/maevsi/maevsi/workflows/CI/badge.svg)](https://github.com/maevsi/maevsi/actions?query=workflow%3ACI "build status")
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/maevsi/maevsi.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/maevsi/maevsi/context:javascript)

# maevsi - **ALPHA**

The manager for events supported by invitees: [maev.si](https://maev.si/).

<!-- ![Welcome](images/welcome.jpg "maevsi") -->

## Table of Contents
1. **[Development](#development)**
    1. **[Sqitch](#sqitch)**
1. **[Technology](#technology)**

## Development

This project is deployed within the [maevsi_stack](https://github.com/maevsi/maevsi_stack/) in accordance to the [DargStack template](https://github.com/dargmuesli/dargstack_template/) to make deployment a breeze.


### Sqitch

The database management tool *Sqitch* needs special configuration.

- run `mkdir -p /mnt/dev/postgresql/` to create the database's socket mount point, which Sqitch uses to connect to the database
- run `cd sqitch` from this project's root directory
- run `cp SQITCH_TARGET.env.template SQITCH_TARGET.env` and fill in the correct target
- run `./sqitch` with appropriate parameters

  (optionally, add an `alias sqitch="./sqitch"` to your shell, so that you can run `sqitch` like a binary without the preceding location indicator)


## Technology

<img src="https://nuxtjs.org/logos/nuxtjs-typo.svg" alt="Nuxt.js" width="1000"/>
<img src="https://www.graphile.org/static/postgres_postgraphile_graphql-4b238552d875fe06196ba3bda74c6d2b.png" alt="PostGraphile" width="1000"/>
<img src="https://sqitch.org/img/sqitch-logo.svg" alt="Sqitch" width="1000"/>
