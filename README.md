[![build status](https://github.com/maevsi/maevsi/workflows/CI/badge.svg)](https://github.com/maevsi/maevsi/actions?query=workflow%3ACI "build status")


# maevsi

The manager for events supported by invitees: [maev.si](https://maev.si/).

This project is deployed within the [maevsi_stack](https://github.com/maevsi/maevsi_stack/) in accordance with the [DargStack template](https://github.com/dargmuesli/dargstack_template/) to make deployment a breeze.

![Welcome](docs/assets/hero.png "maevsi")

## Table of Contents
1. **[Development](#development)**
    1. **[Preparation](#preparation)**
    1. **[Setup](#setup)**
    1. **[Container Management](#container-management)**
    1. **[Sqitch](#sqitch)**
1. **[Technology](#technology)**

## Development

You could simply use [Node.js](https://nodejs.org/en/) and [pnpm](https://pnpm.io/) to run `pnpm run dev` and have a development server running on your machine, but you'd be missing a backend to serve data to display.
The following steps show how to start the full development stack:

### Preparation

1. if you're on Windows, [setup WSL](https://docs.microsoft.com/en-us/windows/wsl/install) to be able to use all Linux functionality this project utilizes
1. [install Git](https://git-scm.com/) to download this project's modules and participate in version management
1. [install Docker](https://docs.docker.com/engine/install/) so that all services run in their [containers](https://en.wikipedia.org/wiki/Containerization)
1. [install dargstack](https://github.com/dargmuesli/dargstack#installation-example) to bootstrap a [Docker stack](https://docs.docker.com/engine/reference/commandline/stack/) setup
1. [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to be able to switch the currently active [Node.js](https://nodejs.org/en/) version on your machine
1. [install mkcert](https://github.com/FiloSottile/mkcert#installation) for development certificate generation and installation, so that all services are available through https


### Setup

1. create a directory named `maevsi` in a directory of your liking
1. download the project modules [maevsi](https://github.com/maevsi/maevsi), [maevsi_stack](https://github.com/maevsi/maevsi_stack) and [stomper](https://github.com/maevsi/stomper) into that newly created directory:
    ```sh
    cd maevsi
    git clone https://github.com/maevsi/maevsi.git
    git clone https://github.com/maevsi/maevsi_stack.git
    git clone https://github.com/maevsi/stomper.git
    ```
    **maevsi** contains the frontend and database migrations, **maevsi_stack** is the service configuration and **stomper** is the service that sends out emails.
1. switch into the `maevsi` subdirectory and setup Node:
    ```sh
    cd maevsi
    nvm install
    nvm use
    ```
1. then install all dependencies using [pnpm](https://pnpm.io/), including the **nuxt** directory:
    ```sh
    corepack enable
    pnpm install

    cd nuxt
    pnpm install
    ```
    If there is an issue regarding OpenSSL, then you might want to set the environment variable `NODE_OPTIONS=--openssl-legacy-provider` and try again.
1. configure maevsi's [DargStack](https://github.com/dargmuesli/dargstack) then:
    ```sh
    cd ../../maevsi_stack/src/development
    cp stack.env.template stack.env
    pnpm store path
    vim stack.env # fill PNPM_STORE_DIR with what's printed by the previous command
    ```
1. install a root development certificate on your system and create subcertificates for the application:
    ```sh
    mkcert -install
    ./certificates/mkcert.sh
    ```
1. you are now ready to start everything up:
    ```sh
    cd ../../
    dargstack deploy
    ```
1. finally, create the Docker development images for `maevsi` and `stomper` so that their services start successfully:
    ```sh
    dargstack build maevsi
    dargstack build stomper
    ```


### Container Management

To see if services are running or not you can use [Portainer](https://www.portainer.io/) if you prefer a web view instead of the command line:
```sh
sudo docker run --name portainer --restart=always -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
Access Portainer on `http://localhost:9000` then.
Create a user, add an environment, start the Docker wizard, choose "Socket", name it e.g. "local" and close the wizard.
Under "home", select the newly created environment then.
You'll have access to all containers, images, volumes and more via the left sidebar then.


### Sqitch

In case you want to apply or revert the database migrations, you need to use [Sqitch](https://sqitch.org/).

The `sqitch` directory in this repository contains a `sqitch` executable that you can use to interact with the migrations residing in the directory's subdirectories.
For example, run `./sqitch deploy` to fill the database with structure like tables, types and policies.

In case you want to be able to simple call `sqitch deploy` without `./` instead, add an `alias sqitch="./sqitch"` to your shell configuration (`~/.bashrc`, `~/.zshrc`, ...).


## Technology

<img src="https://nuxtjs.org/design-kit/colored-text.svg" alt="Nuxt.js" width="1000"/>
<img src="https://www.graphile.org/static/postgres_postgraphile_graphql-4b238552d875fe06196ba3bda74c6d2b.png" alt="PostGraphile" width="1000"/>
<img src="https://sqitch.org/img/sqitch-logo.svg" alt="Sqitch" width="1000"/>
