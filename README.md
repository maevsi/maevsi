[![CI](https://github.com/maevsi/maevsi/actions/workflows/ci.yml/badge.svg)](https://github.com/maevsi/maevsi/actions/workflows/ci.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmaevsi%2Fmaevsi.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmaevsi%2Fmaevsi?ref=badge_shield)

# maevsi

Find events, guests and friends: [maev.si](https://maev.si/).

This project is deployed within the [maevsi_stack](https://github.com/maevsi/maevsi_stack/) in accordance with the [DargStack template](https://github.com/dargstack/dargstack_template/) to make deployment a breeze.

![Welcome](docs/assets/hero.png "maevsi")

## Table of Contents
1. **[Development](#development)**
    1. **[Frontend only](#frontend-only)**
    1. **[Fullstack](#fullstack)**
1. **[Technology](#technology)**

## Development

The setup for frontend development is easy! 💅

The setup for backend development is more complex as it consists of numerous services which are best set up containerized 🧑‍💻

### Frontend only

<details>
  <summary><b>click here for instructions</b></summary>

#### Preparation

1. (optional) if you're on Windows, you might want to [setup WSL](https://docs.microsoft.com/en-us/windows/wsl/install) to be able to use all Linux functionality this project utilizes
1. [install Git](https://git-scm.com/) to download this project's modules and participate in version management
1. [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to be able to switch the currently active [Node.js](https://nodejs.org/en/) version on your machine (useful when working on multiple Node.js projects)

#### Setup

1. create a directory named `maevsi` in a directory of your liking
1. download this repository into that newly created directory:
    ```sh
    cd maevsi
    git clone https://github.com/maevsi/maevsi.git
    ```
1. switch into the `maevsi` subdirectory and setup Node:
    ```sh
    cd maevsi
    nvm install
    nvm use
    ```
1. then install all dependencies using [pnpm](https://pnpm.io/), which should include the **nuxt** directory automatically:
    ```sh
    corepack enable
    pnpm install
    ```
1. finally, start the frontend:

    ```sh
    cd nuxt
    pnpm dev
    ```
1. you should now be able to access maevsi under http://localhost:3000/! 🎉

</details>

### Fullstack
<details>
  <summary><b>click here for instructions</b></summary>

#### Preparation

1. if you're on Windows, [setup WSL](https://docs.microsoft.com/en-us/windows/wsl/install) to be able to use all Linux functionality this project utilizes
1. [install Git](https://git-scm.com/) to download this project's modules and participate in version management
1. [install nvm](https://github.com/nvm-sh/nvm#installing-and-updating) to be able to switch the currently active [Node.js](https://nodejs.org/en/) version on your machine
1. [install mkcert](https://github.com/FiloSottile/mkcert#installation) for development certificate generation and installation, so that all services are available through https
1. [install Docker](https://docs.docker.com/engine/install/) so that all services run in their [containers](https://en.wikipedia.org/wiki/Containerization)
1. [install dargstack](https://github.com/dargstack/dargstack#installation-example) to bootstrap a [Docker stack](https://docs.docker.com/engine/reference/commandline/stack/) setup


#### Setup

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
    ```
1. configure maevsi's [DargStack](https://github.com/dargstack/dargstack) then:
    ```sh
    cd ../maevsi_stack/src/development
    cp stack.env.template stack.env
    pnpm store path
    $EDITOR stack.env # fill PNPM_STORE_DIR with what's printed by the previous command
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
1. you should now be able to access maevsi under https://localhost! 🎉

    If there are issues, you can debug the services as described in the following "Container Management" section.


#### Container Management

To see if services are running or not you can use [Portainer](https://www.portainer.io/) if you prefer a web view instead of the command line:
```sh
sudo docker run --name portainer --restart=always -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce
```
Access Portainer on `http://localhost:9000` then.
Create a user, add an environment, start the Docker wizard, choose "Socket", name it e.g. "local" and close the wizard.
Under "home", select the newly created environment then.
You'll have access to all containers, images, volumes and more via the left sidebar then.


#### Sqitch

In case you want to apply or revert the database migrations, you need to use [Sqitch](https://sqitch.org/).

The `sqitch` directory in this repository contains a `sqitch` executable that you can use to interact with the migrations residing in the directory's subdirectories.
For example, run `./sqitch deploy` to fill the database with structure like tables, types and policies.

In case you want to be able to simple call `sqitch deploy` without `./` instead, add an `alias sqitch="./sqitch"` to your shell configuration (`~/.bashrc`, `~/.zshrc`, ...).
</details>


## Technology

[<img src="https://nuxt.com/assets/design-kit/logo/full-logo-green-light.svg" alt="Nuxt" width="1000"/>](https://nuxt.com)
[<img src="https://www.graphile.org/static/postgres_postgraphile_graphql-4b238552d875fe06196ba3bda74c6d2b.png" alt="PostGraphile" width="1000"/>](https://www.graphile.org/postgraphile/)
[<img src="https://sqitch.org/img/sqitch-logo.svg" alt="Sqitch" width="1000"/>](https://sqitch.org/)
