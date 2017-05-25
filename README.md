# Website for Robert Holzer

A Docker Environment for Wordpress Webpack2 with HMR MySql on top of Ubuntu with Apache and PHP7.0


## Requirements

- [Docker](http://docker.com) Download the app for: [Mac OSX](https://download.docker.com/mac/stable/Docker.dmg) or [Windows 10 App](https://download.docker.com/win/stable/InstallDocker.msi)
- [Docker Compose](http://docs.docker.com/compose/) installation with [homebrew](https://brew.sh/index_de.html) `brew install docker-compose`

## Run & build

### Run for development

run wordpress: `docker-compose up wordpress`
run frontend for development without docker:

```bash
yarn install
yarn run start
```

Open browser at **http://localhost:3000**


### Run Docker environments

- run everything with build: `docker-compose up` with building `docker-compose up --build`
- frontend build: `docker-compose up frontend` with building `docker-compose up --build frontend`
- wordpress build: `docker-compose up wordpress` with building `docker-compose up --build wordpress`


### Commands

A short list of useful commands for this Bootstrapping

- run: `docker-compose up`
- run in background: `docker-compose up -d`
- run and build: `docker-compose up --build`
- build: `docker-compose build`
- shutdown: `docker-compose down`
- list all images: `docker images -a`
- list all running images: `docker ps`

### stop all containers and delete all images on Mac

After this commands every image and container has to be pulled again and created.
Clean reset if the hard drive is messed up.

``` bash
docker stop $(docker ps -a -q)
docker rm -v $(docker ps -a -q)
docker rmi $(docker images -q)
```

## Maintainer

**Lukas Holzer**

* Email: <office@lukasholzer.com>
* Twitter: [@luka5c0m](https://twitter.com/luka5c0m)
* Web: [www.lukasholzer.com](http://www.lukasholzer.com)


# Thanks to 
- [vutran](https://github.com/vutran) with his [Repo](https://github.com/vutran/wpmvc)
- [visiblevc](https://github.com/visiblevc) with the [Repo](https://github.com/visiblevc/wordpress-starter)
- [Thomas Pink](https://github.com/thomaspink) with his [Repo](https://github.com/thomaspink/sls-eventservice)
- [ttskch](https://github.com/ttskch/wordpress-silex-sample/)