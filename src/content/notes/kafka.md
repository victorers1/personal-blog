---
title: 'Kafka'
description: 'Notes from a course'
pubDate: 'Ago 27 2024'
heroImage: '/blog-placeholder-1.jpg'
---

## Introduction

**Apache Kafka** is an event streaming platform.

Kafka combines three key capabilities so you can implement your use cases for event streaming end-to-end with a single battle-tested solution:

1. To publish (write) and subscribe to (read) streams of events, including continuous import/export of your data from other systems.
1. To store streams of events durably and reliably for as long as you want.
1. To process streams of events as they occur or retrospectively.

### Installation

- Download from the [official website](https://kafka.apache.org/downloads).

- Extract to a folder of your preference, like the user root. Let's call it `$KAFKA_HOME` in this doc.

- No need to define it in the System's Path. Use the Terminal to run Kafka's scripts.

- Scripts are inside:
  - `$KAFKA_HOME/bin` for MacOS and Linux. They're `.sh` files.
  - `$KAFKA_HOME/bin/windows` for Windows. They're `.bat` files.

## Kafka Scripts

Below, we have command scripts for windows version. They should work exactly the same way on macOS and Linux.

### Generating IDs

### Create Topic

`./kafka-topics.bat`

### List Topic

`.\kafka-topics.bat --list --bootstrap-server localhost:9092`

### Produce Events

Run this to produce events without key: `.\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic my-topic`. The command will hang the terminal and wait for text input. Insert the event in text format and and hit Enter to submit it.

To produce Key-Value pair events add the param `--property parse.key=true` to enable the Key-Value pair support. Add `--property key.separator=:` to config the Key-Value pair separator char.

The final command will look like this: `.\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic my-topic --property parse.key=true --property key.separator=:`.

By default, all events are Key-Value pairs. When a Key aren't specified, it's sent as `null`.

### Consume Events

When an event is consumed, it's not destroyed. New consumers can check the entire history. To consume a topic from beginning, run: `.\kafka-console-consumer.bat --topic my-topic --from-beginning --bootstrap-server localhost:9092`.

To consume only new events, run the previous command without `--from-beginning` flag.

To consume a Key-Value pair event, there is no additional configuration on consumers. The responsibility of creating a valid event is on the Producer. But, to control whether the key is printed, use the param `--property print.key=true`.

## Running on Docker

Docker Compose file used to run 3 Kafka servers in a cluster:

```Dockerfile
version: "3.8"

services:
  kafka-1:
    image: bitnami/kafka:latest
    ports:
      - "9092:9092"
    environment:
      - KAFKA_CFG_NODE_ID=1
      - KAFKA_KRAFT_CLUSTER_ID=5r0WGdYbSQqTGHUyzxdifA
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka-1:9091,2@kafka-2:9091,3@kafka-3:9091
      - KAFKA_CFG_LISTENERS=PLAINTEXT://[::1]:9090,CONTROLLER://:9091,EXTERNAL://:9092
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka-1:9090,EXTERNAL://[::1]:9092
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT
    volumes:
      - D:\Documents\kafka\kafka-1:/bitnami/kafka

  kafka-2:
    image: bitnami/kafka:latest
    ports:
      - "9094:9094"
    environment:
      - KAFKA_CFG_NODE_ID=2
      - KAFKA_KRAFT_CLUSTER_ID=5r0WGdYbSQqTGHUyzxdifA
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka-1:9091,2@kafka-2:9091,3@kafka-3:9091
      - KAFKA_CFG_LISTENERS=PLAINTEXT://[::1]:9090,CONTROLLER://:9091,EXTERNAL://:9094
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka-2:9090,EXTERNAL://[::1]:9094
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT
    volumes:
      - D:\Documents\kafka\kafka-2:/bitnami/kafka

  kafka-3:
    image: bitnami/kafka:latest
    ports:
      - "9096:9096"
    environment:
      - KAFKA_CFG_NODE_ID=3
      - KAFKA_KRAFT_CLUSTER_ID=5r0WGdYbSQqTGHUyzxdifA
      - KAFKA_CFG_PROCESS_ROLES=controller,broker
      - KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka-1:9091,2@kafka-2:9091,3@kafka-3:9091
      - KAFKA_CFG_LISTENERS=PLAINTEXT://[::1]:9090,CONTROLLER://:9091,EXTERNAL://:9096
      - KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT://kafka-3:9090,EXTERNAL://[::1]:9096
      - KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER:PLAINTEXT,EXTERNAL:PLAINTEXT,PLAINTEXT:PLAINTEXT
      - KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
      - KAFKA_CFG_INTER_BROKER_LISTENER_NAME=PLAINTEXT
    volumes:
      - D:\Documents\kafka\kafka-3:/bitnami/kafka
```

Save this file as `docker-compose.yml`, (if you're on windows, open Docker program) and run following the command on the directory which the compose file was saved: `docker-compose up`.
