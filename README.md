[![ci status][ci-image]][ci-url]
[![license status][license-image]][license-url]

[ci-image]: https://img.shields.io/github/actions/workflow/status/maevsi/maevsi/ci.yml
[ci-url]: https://github.com/maevsi/maevsi/actions/workflows/ci.yml
[license-image]: https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmaevsi%2Fmaevsi.svg?type=shield
[license-url]: https://app.fossa.com/projects/git%2Bgithub.com%2Fmaevsi%2Fmaevsi?ref=badge_shield

# maevsi

Find events, guests and friends: [maev.si](https://maev.si/).

This project is deployed within the [maevsi_stack](https://github.com/maevsi/maevsi_stack/) in accordance with the [DargStack template](https://github.com/dargstack/dargstack_template/) to make deployment a breeze.

![Welcome](https://maev.si/__og-image__/image/og.png "maevsi")

## Table of Contents
1. **[Development](#development)**
    1. **[Frontend only](#frontend-only)**
    1. **[Fullstack](#fullstack)**
1. **[Technology](#technology)**

## Development

The setup for frontend development is easy! 💅

The setup for backend development is more complex as it consists of numerous services which are best set up containerized 🧑‍💻

You're encouraged to ask questions on [maevsi's Discord](https://discord.gg/E3hD3wEUQ4) if the setup could go smoother!

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
    ```
1. then install all dependencies using [pnpm](https://pnpm.io/), which should include the **src** directory automatically:
    ```sh
    corepack enable
    pnpm install
    ```
1. finally, start the frontend:

    ```sh
    cd src
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
1. download the project modules [maevsi](https://github.com/maevsi/maevsi), [maevsi_stack](https://github.com/maevsi/maevsi_stack) and [sqitch](https://github.com/maevsi/sqitch) into that newly created directory:
    ```sh
    cd maevsi
    git clone https://github.com/maevsi/maevsi.git
    git clone https://github.com/maevsi/maevsi_stack.git
    git clone https://github.com/maevsi/sqitch.git
    ```
    - **maevsi** contains the frontend and database migrations
    - **maevsi_stack** is the service configuration
    - **sqitch** is the database migration service
1. switch into the `maevsi` subdirectory and setup Node:
    ```sh
    cd maevsi
    nvm install
    ```
1. then install all dependencies using [pnpm](https://pnpm.io/), including the **src** directory:
    ```sh
    corepack enable
    pnpm install
    ```
1. configure maevsi's [DargStack](https://github.com/dargstack/dargstack) then take note of the following output:
    ```sh
    cd ../maevsi_stack/src/development
    cp stack.env.template stack.env
    pnpm store path
    ```
1. use the previous command's path output to fill the `PNPM_STORE_DIR` variabe using the editor of your choice:
    ```sh
    $EDITOR stack.env
    ```
1. install a root development certificate on your system and create subcertificates for the application to have all services available under `https`:
    ```sh
    mkcert -install
    ./certificates/mkcert.sh
    ```
    > Note that in a WSL setup `mkcert` does not import the root certificate authority into your browsers' certificate store.
    You'd need to manually add this certificate to your browsers' storage then.
    You can find the directory containing the certificate file by running `mkcert -CAROOT`.
1. you are now ready to start everything up:
    ```sh
    cd ../../
    dargstack deploy
    ```
1. finally, create the Docker development images for `maevsi` and `sqitch` so that their services start successfully:
    ```sh
    dargstack build maevsi
    dargstack build sqitch
    ```
1. you should now be able to access maevsi under https://localhost! 🎉

    If there are issues, you can debug the services as described in the following "Container Management" section.


#### Container Management

To see if services are running or not you can use [Portainer](https://www.portainer.io/) if you prefer a web view instead of the command line.
Head to [this gist](https://gist.github.com/dargmuesli/5808c950c03b2b49754681e1d9e5cb4e) for the Portainer setup command.
When the container is running, you'll be able to access Portainer under https://localhost:9443.
You may be asked to accept the risk of a self-signed certificate, which is ok to do at this time.
On your local Portainer website, create a user, add an environment, start the Docker wizard, choose "Socket", name it e.g. "local" and close the wizard.
Under "home", select the newly created environment then.
You'll have access to all containers, images, volumes and more via the left sidebar then.
</details>


## Technology

<a href="https://nuxt.com">
  <picture>
    <source srcset="https://nuxt.com/assets/design-kit/logo-green-black.svg" media="(prefers-color-scheme: light)">
    <source srcset="https://nuxt.com/assets/design-kit/logo-green-white.svg" media="(prefers-color-scheme: dark)">
    <img alt="Nuxt" src="https://nuxt.com/assets/design-kit/logo-green-black.svg" width="1200">
  </picture>
</a>
