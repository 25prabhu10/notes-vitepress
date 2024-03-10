---
title: Docker
description: Docker is a set of platform as a service (PaaS) products
---

# Docker

Docker is a set of platform as a service (PaaS) products that use OS-level virtualisation to deliver software in packages called [containers](#container)

- The software that hosts the containers is called **Docker Engine**

_Example:_

```bash
# pull a docker image
docker pull alpine

# run a new container from the image
docker run -t -d --name <customName> alpine

# check currently running Docker containers
docker ps

# connect to a container
docker exec -it <customName> bash

# stop a container
docker stop <customName>

# check container stats
docker stats
```

## Container

A way to **package application** with **all** the **necessary dependencies** and **configuration**

- Portable artifact, easily shared and moved around.

Need of containers:

- Compatibility / Dependency
- Long setup time
- Different Dev/Test/Prod environments

## Installation

- One click installation script:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

- Run docker as non root user:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

- [Install Docker Engine](https://docs.docker.com/engine/install/)

## Docker CLI

_Example:_

```bash
docker build .

docker build -t <image-name>:<version> .

docker image ls

docker image rm <image-id>
docker rmi -f <image-id>

docker run -p 8080:3000 -d --name <container-name> <image-name>

docker run -it <container-name>

# enter the container
docker exec -it <container-name> bash

# delete container
docker rm <container-name> -f
```

- Run Containers:

| Command                                      | Description                             |
| -------------------------------------------- | --------------------------------------- |
| `docker run IMAGE`                           | Start a new container                   |
| `docker run --name CONTAINER IMAGE`          | Start a new container and set a name    |
| `docker run -p HOSTPORT:CONTAINERPORT IMAGE` | Start a new container with mapped ports |
| `docker run -P IMAGE`                        | Start a new container and map all ports |

- Container Management:

| Command                    | Description                           |
| -------------------------- | ------------------------------------- |
| `docker create IMAGE`      | Create a new container                |
| `docker start CONTAINER`   | Start a container                     |
| `docker stop CONTAINER`    | Graceful stop a container             |
| `docker kill CONTAINER`    | Kill (`SIGKILL`) a container          |
| `docker restart CONTAINER` | Graceful stop and restart a container |
| `docker pause CONTAINER`   | Suspend a container                   |
| `docker unpause CONTAINER` | Resume a container                    |
| `docker rm CONTAINER`      | Destroy a container                   |

- Container Bulk Management:

| Command                                | Description                                                             |
| -------------------------------------- | ----------------------------------------------------------------------- |
| `docker stop $(docker ps -q)`          | To stop all the running containers                                      |
| `docker stop $(docker ps -a -q)`       | To stop all the stopped and running containers                          |
| `docker kill $(docker ps -q)`          | To kill all the running containers                                      |
| `docker kill $(docker ps -a -q)`       | To kill all the stopped and running containers                          |
| `docker restart $(docker ps -q)`       | To restart all running containers                                       |
| `docker restart $(docker ps -a -q)`    | To restart all the stopped and running containers                       |
| `docker rm $(docker ps -q)`            | To destroy all running containers                                       |
| `docker rm $(docker ps -a -q)`         | To destroy all the stopped and running containers                       |
| `docker pause $(docker ps -q)`         | To pause all running containers                                         |
| `docker pause $(docker ps -a -q)`      | To pause all the stopped and running containers                         |
| `docker start $(docker ps -q)`         | To start all running containers                                         |
| `docker start $(docker ps -a -q)`      | To start all the stopped and running containers                         |
| `docker rm -vf $(docker ps -a -q)`     | To delete all containers including its volumes use                      |
| `docker rmi -f $(docker images -a -q)` | To delete all the images                                                |
| `docker system prune`                  | To delete all dangling and unused images, containers, cache and volumes |
| `docker system prune -a`               | To delete all used and unused images                                    |
| `docker system prune --volumes`        | To delete all docker volumes                                            |

- Inspect Containers:

| Command                    | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| `docker ps`                | List running containers                              |
| `docker ps -a`             | List all containers, including stopped               |
| `docker logs CONTAINER`    | Show a container output                              |
| `docker logs -f CONTAINER` | Follow a container output                            |
| `docker top CONTAINER`     | List the processes running in a container            |
| `docker diff`              | Show the differences with the image (modified files) |
| `docker inspect`           | Show information of a container (json formatted)     |

- Run Commands:

| Command                               | Description                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------- |
| `docker attach CONTAINER`             | Attach to a container                                                                       |
| `docker cp CONTAINER:PATH HOSTPATH`   | Copy files from the container                                                               |
| `docker cp HOSTPATH CONTAINER:PATH`   | Copy files into the container                                                               |
| `docker export CONTAINER`             | Export the content of the container (tar archive)                                           |
| `docker exec CONTAINER`               | Run a command inside a container                                                            |
| `docker exec -it CONTAINER /bin/bash` | Open an interactive shell inside a container (there is no bash in some images, use /bin/sh) |
| `docker wait CONTAINER`               | Wait until the container terminates and return the exit code                                |

- Images:

| Command                         | Description                              |
| ------------------------------- | ---------------------------------------- |
| `docker images`                 | List all local images                    |
| `docker history IMAGE`          | Show the image history                   |
| `docker inspect IMAGE`          | Show information (json formatted)        |
| `docker tag IMAGE TAG`          | Tag an image                             |
| `docker commit CONTAINER IMAGE` | Create an image (from a container)       |
| `docker import URL`             | Create an image (from a tarball)         |
| `docker rmi IMAGE`              | Delete images                            |
| `docker pull REPO:[TAG]`        | pull an image/repo from a registry       |
| `docker push REPO:[TAG]`        | push and image/repo to a registry        |
| `docker search TEXT`            | Search an image on the official registry |
| `docker login`                  | Login to a registry                      |
| `docker logout`                 | Logout from a registry                   |
| `docker save REPO:[TAG]`        | Export an image/repo as a tarball        |
| `docker load`                   | Load images from a tarball               |

- Volumes:

| Command                                     | Description                                                 |
| ------------------------------------------- | ----------------------------------------------------------- |
| `docker volume ls`                          | List all volumes                                            |
| `docker volume create VOLUME`               | Create a volume                                             |
| `docker volume inspect VOLUME`              | Show information (json formatted)                           |
| `docker volume rm VOLUME`                   | Destroy a volume                                            |
| `docker volume ls --filter="dangling=true"` | List all dangling volumes (not referenced by any container) |
| `docker volume prune`                       | Delete all volumes (not referenced by any container)        |

## `Dockerfile`

Each step is considered as a layer of an image

- Docker caches results layer by layer

`Dockerfile` statements:

| Command      | Purpose                                                                                                                                         |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `FROM`       | To specify the parent image                                                                                                                     |
| `WORKDIR`    | To set the working directory for any commands that follow in the `Dockerfile`                                                                   |
| `RUN`        | To install any applications and packages required for your container                                                                            |
| `COPY`       | To copy over files or directories from a specific location                                                                                      |
| `ADD`        | As `COPY`, but also able to handle remote URLs and unpack compressed files                                                                      |
| `CNTRYPOINT` | The command that will always be executed when the container starts. if not specified, the default is `/bin/sh -c`                               |
| `CMD`        | Arguments passed to the entrypoint. If `ENTRYPOINT` is not set (defaults to `/bin/sh -c`) the `CMD` will be the commands the container executes |
| `EXPOSE`     | To define which port through which to access your container application                                                                         |
| `LABEL`      | To add metadata to the image                                                                                                                    |

_Example:_

- From scratch:

  ```dockerfile
  # syntax=docker/dockerfile:1
  FROM scratch
  COPY helloworld /
  CMD ["/helloworld"]
  ```

- Python app:

  ```dockerfile
  # Docker image
  FROM python:latest

  # Set the working directory
  WORKDIR /app

  # Install dependencies
  COPY ./requirements.txt /app
  RUN pip install --no-cache-dir --upgrade -r requirements.txt

  # Copy the scripts to the folder
  COPY . /app

  # Start the app
  CMD ["python main.py"]
  ```

`.dockerignore` file is used to prevent sensitive or unnecessary files and directories from making their way into your image builds

- It should be in the root directory, known as the build **context**

- [ASP.NET Core app](../../C-Sharp/ASP_NET/Deployment.md#deploying-with-docker)

## Docker-Compose

Docker-compose is a tool that is used for multi-container applications in a single host

[Getting started](https://docs.docker.com/compose/gettingstarted/)

_Example:_ `docker-compose.yaml` file

```yml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:5000"
  redis:
    image: "redis:alpine"
```

Networking:

By default Docker-Compose will create a new network for the given compose file. You can change the behaviour by defining custom networks in your compose file

- Create and assign custom network:

_Example:_ `docker-compose.yml`

```yaml
networks:
  custom-network:
services:
  app:
    networks:
      - custom-network
```

- Use existing networks:

If you want to use an existing Docker network for your compose files, you can add the `external: true` parameter in your compose file

_Example:_ `docker-compose.yml`

```yaml
networks:
  existing-network:
    external: true
```

Volumes:

Volumes allow Docker containers to use persistent storage. In a compose file, you can create and map volumes like this:

```yaml
volumes:
  my-volume:
services:
  app:
    volumes:
      - my-volume:/path-in-container
```

These volumes are stored in `/var/lib/docker/volumes`

### Docker-Compose Commands

```bash
# create and start containers
docker-compose up

# start services with detached mode
docker-compose -d up

# start specific service
docker-compose up <service-name>

# list images
docker-compose images

# list containers
docker-compose ps

# start service
docker-compose start

# stop services
docker-compose stop

# display running containers
docker-compose top

# kill services
docker-compose kill

# remove stopped containers
docker-compose rm

# stop all containers and remove images, volumes
docker-compose down
```

## Networking

Troubleshooting: `docker run --name netshoot --rm -it nicolaka/netshoot /bin/bash`

## Backup and Restore Containers

Backup docker data from inside container volumes and package it in a tarball archive

```bash
docker run --rm --volumes-from CONTAINER -v $(pwd):/backup busybox tar cvfz /backup/backup.tar CONTAINERPATH
```

An automated backup can be done also by this [Ansible playbook](https://github.com/thedatabaseme/docker_backup)

The output is also a (compressed) tar. The playbook can also manage the backup retention. So older backups will get deleted automatically

To also create and backup the container configuration itself, you can use `docker-replay`for that. If you lose the entire container, you can recreate it with the export from `docker-replay`

A more detailed tutorial on how to use docker-replay can be found [here](https://thedatabaseme.de/2022/03/18/shorty-generate-docker-run-commands-using-docker-replay/)

### Restore container from backup

Restore the volume with a tarball archive:

```bash
docker run --rm --volumes-from CONTAINER -v $(pwd):/backup busybox sh -c "cd CONTAINERPATH && tar xvf /backup/backup.tar --strip 1"
```

## Reference

- [Docker Homepage](https://www.docker.com/)
- [Docker Documentation](https://docs.docker.com/)
- "Learning Docker" by Arthur Ulfeldt
- Docker for .NET Developers with Visual Studio by Lee Brandt
