---
title: 'Docker'
description: "Concepts and commands"
pubDate: 'Apr 29 2024'
updatedDate: 'Apr 29 2024'
heroImage: '/docker-gradient.png'
---

## Intro

## Remembering Commands

Run `docker` in the terminal to see an overview of the main commands. The most important ones are:

```terminal
run         Create and run a new container from an image
exec        Execute a command in a running container
ps          List containers
build       Build an image from a Dockerfile
pull        Download an image from a registry
push        Upload an image to a registry
images      List images
login       Log in to a registry
search      Search Docker Hub for images
version     Show the Docker version information
info        Display system-wide information
```

Instructions about the usage and the parameters of a command can be done by running it followed by `--help`. For example: `docker exec --help` will produce the output:

```terminal
Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
Execute a command in a running container
Aliases:
  docker container exec, docker exec
Options:
  -d, --detach               Detached mode: run command in the background
      --detach-keys string   Override the key sequence for detaching a container
  -e, --env list             Set environment variables
      --env-file list        Read in a file of environment variables
  -i, --interactive          Keep STDIN open even if not attached
      --privileged           Give extended privileges to the command
  -t, --tty                  Allocate a pseudo-TTY
  -u, --user string          Username or UID (format: "<name|uid>[:<group|gid>]")
  -w, --workdir string       Working directory inside the container
```

## Stages of Containerization

The first step is to write a **Dockerfile** using the syntax defined on the [Dockerfile reference](https://docs.docker.com/reference/dockerfile/). That file is used to build a **Docker Image**, which can be shipped to the [DockerHub website](https://hub.docker.com/). This way, others can download your image and use it on their machines. When someone runs the command `docker run -itd [IMAGE_NAME]`, Docker automatically creates a **Container** to run your Docker Image in it.

| With a... | You can... |
| --- | --- |
| Dockerfile | Build |
| Docker Image | Ship |
| Container | Run |

## Components of Docker

Docker client: the medium which the user interacts with Docker. Contains the Docker CLI and the Docker API

Docker Host: the machine which actually runs the tasks. Contains the Docker daemon, local images and containers.

Docker Registry: the remote place where Docker Images are stored. Anyone can pull images from there.

## Docker Files

A sequential set of instructions for Docker Engine. Order is important.

Examples of commands:

- Fundamentals Instruction: `FROM`, `ARG`
- Configuration Instructions: `RUN`, `ADD`, `COPY`, `ENV`
- Execution Instructions: `CMD`, `ENTRYPOINT`, `EXPOSE`

Example of Dockerfile:

```Dockerfile
ARG CODE_VERSION=16.04

FROM ubuntu:${CODE_VERSION}

ENV USER Victor
ENV SHELL /bin/bash
ENV LOGNAME Victor-Emanuel

RUN apt-get update -y && apt-get install vim -y

CMD ["bash"]
```

The above code can be built into an Docker Image with the command: `docker build -t first_image .`. Where "first_image" is the image's identifying tag and `.` is the directory where the Dockerfile is located.

To create a container for the new image, run: `docker run -itd --name cont_first_image first_image`. Where "cont_first_image" is the container's name. "-itd" stands for:

```terminal
Options:
  -d, --detach        Detached mode: run command in the background
  -i, --interactive   Keep STDIN open even if not attached
  -t, --tty           Allocate a pseudo-TTY
```

If the Dockerfile is changed, another build is necessary.

## Containers

Just like a process is a running instance of a program, a Container is a running instance of a Docker Image. By "Run", we mean "Use CPU, RAM and Storage". They can talk to others Containers, like processes in Linux and uses Copy-On-Write file system.

### I/O Attach

To attach to a Container output, there is the command `docker attach [CONTAINER_NAME]`, but this will stop the Container execution when it is exited with the command `exit`. To prevent this behavior, an alternative is to attach using the command `docker exec -it [CONTAINER_NAME] bash`. For example: `docker exec -it first_container bash`. After inserting the `exit` command and checking all running containers with `docker ps`, the "first_container" is still up. Note that the `bash` can be replaced by others commands like `ls` and `pwd`, but these will automatically exit after the output is printed out.
