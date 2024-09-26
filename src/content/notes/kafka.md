---
title: 'Kafka'
description: 'Notes from a course'
pubDate: 'Aug 27 2024'
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

### Managing Topics

#### Create Topic

`./kafka-topics.bat --create --topic topic-name --partitions 3 --replication-factor 3 --bootstrap-server localhost:9092 --config min.insync.replicas=2`

1. `--create`: tells Kafka that you want to create a new topic.

1. `--topic topic-name`: specifies the name of the topic you want to create.

1. `--partitions 3`: sets the number of partitions for the topic. Partitions are a way to distribute data across multiple Kafka brokers, which can improve scalability and performance. In this case, the topic will have 3 partitions.

1. `--replication-factor 3`: specifies the number of replicas for each partition. A replication factor of 3 means that each partition will be replicated across 3 Kafka brokers. This is crucial for fault tolerance because if one broker fails, the other replicas can continue serving the data.

1. `--bootstrap-server localhost:9092`: specifies the Kafka broker's address (host and port) that the command should connect to. The broker serves as the entry point to the Kafka cluster.

1. `--config min.insync.replicas=2`: defines the minimum number of replicas that must acknowledge a write for the message to be considered successfully written. If the number of in-sync replicas falls below this threshold, the producer will receive an error and the message won't be written to the topic. Setting this to 2 means that at least 2 out of the 3 replicas must acknowledge the write. This helps ensure data consistency and durability but requires that at least 2 brokers are up and running at any time.

#### Delete Topic

`kafka-topics.sh --delete --topic topic-name --bootstrap-server localhost:9092`

#### List Topics

To list topis from a specific server: `.\kafka-topics.bat --list --bootstrap-server localhost:9092`

#### Describe Topic

To get info about a topic: `.\kafka-topics.bat --bootstrap-server localhost:9092 --describe --topic product-create-events-topic`.

Example of output:

```terminal
Topic: product-create-events-topic      TopicId: U7J3LhLMTlCTS9K9ElmzbA PartitionCount: 3       ReplicationFactor: 3   Configs: min.insync.replicas=2
        Topic: product-create-events-topic      Partition: 0    Leader: 1       Replicas: 1,2,3 Isr: 3,1,2  Elr:    LastKnownElr:
        Topic: product-create-events-topic      Partition: 1    Leader: 2       Replicas: 2,3,1 Isr: 1,2,3  Elr:    LastKnownElr:
        Topic: product-create-events-topic      Partition: 2    Leader: 3       Replicas: 3,1,2 Isr: 2,3,1  Elr:    LastKnownElr:
```

- **Topic**  the name of the topic.
- **Partition** ID of the partition. In the example above there are 3 partitions.
- **Leader** ID of the partition's Leader, which is the broker responsible to read/write requests.
- **Replicas** Ids of the brokers which stores that partition replicas. In the example above, each partition has 3 replicas. Partition 0 has replicas in broker 1, 2, and 3.
- **Isr** stands for Insync Replicas. It holds the Ids of the brokers which are in sync with that partition Leader. In sync Brokers that replace the Leader.

#### Edit Topic

Run `.\kafka-configs.bat --bootstrap-server localhost:9092 --alter --entity-type topics --entity-name product-create-events-topic --add-config min.insync.replicas=2`. To see if the alteration was successful, run [Describe Topic](#describe-topic) command.

### Produce Events

To produce events without key: `.\kafka-console-producer.bat --bootstrap-server localhost:9092 --topic my-topic`. The command will hang the terminal and wait for text input. Insert the event in text format and and hit Enter to submit it.

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

Save this file as `docker-compose.yml`, (if you're on windows, open Docker program) and run the following the command on the directory which the compose file was saved: `docker-compose up`.

## Spring Boot Implementation

### Consumer

The main classes to be aware of are below.

#### Properties

```application.properties
spring.application.name=productsmicroservice

# Start server at random port number
server.port=0

spring.kafka.producer.bootstrap-servers=[::1]:9092,[::1]:9094,[::1]:9096

spring.kafka.producer.key-serializer=org.apache.kafka.common.serialization.StringSerializer
spring.kafka.producer.value-serializer=org.springframework.kafka.support.serializer.JsonSerializer

# How many brokers have to return an acknowledge that the event has been stored
# !Impacts Performance
spring.kafka.producer.acks=all

# How many times Kafka producer will retry to send a message before marking it as failed. Default value is 2147483647.
# spring.kafka.producer.retries=10

# How long the producer will wait before attempting to retry a failed request. Default is 100ms.
# spring.kafka.producer.properties.retry.backoff.ms=1000

# The maximum time Producer can spend trying to deliver the message. Default is 120000 ms (2 minutes).
spring.kafka.producer.properties.delivery.timeout.ms=120000
```

#### Kafka Configuration

```java
import java.util.HashMap;
import java.util.Map;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import com.pessoallegal.webservice.productsmicroservice.service.ProductCreatedEvent;

@Configuration
public class KafkaConfig {

    @Value("${spring.kafka.producer.bootstrap-servers}")
    private String bootstrapServers;

    @Value("${spring.kafka.producer.key-serializer}")
    private String keySerializer;

    @Value("${spring.kafka.producer.value-serializer}")
    private String valueSerializer;

    @Value("${spring.kafka.producer.acks}")
    private String acks;

    @Value("${spring.kafka.producer.properties.delivery.timeout.ms}")
    private String deliveryTimeout;

    @Value("${spring.kafka.producer.properties.linger.ms}")
    private String linger;

    @Value("${spring.kafka.producer.properties.request.timeout.ms}")
    private String requestTimeout;

    Map<String, Object> producerConfig() {
        Map<String, Object> config = new HashMap<>();
        config.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        config.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, keySerializer);
        config.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, valueSerializer);
        config.put(ProducerConfig.ACKS_CONFIG, acks);
        config.put(ProducerConfig.DELIVERY_TIMEOUT_MS_CONFIG, deliveryTimeout);
        config.put(ProducerConfig.LINGER_MS_CONFIG, linger);
        config.put(ProducerConfig.REQUEST_TIMEOUT_MS_CONFIG, requestTimeout);
        return config;
    }

    @Bean
    ProducerFactory<String, ProductCreatedEvent> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfig());
    }

    @Bean
    KafkaTemplate<String, ProductCreatedEvent> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }

    @Bean
    NewTopic createTopic() {
        return TopicBuilder.name("product-create-events-topic").partitions(3)
                .replicas(3)
                .configs(Map.of("min.insync.replicas", "1"))
                .build();
    }
}
```

#### Rest Controller

```java
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.pessoallegal.webservice.productsmicroservice.service.ProductService;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/products")
public class ProductController {

    ProductService productService;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Object> postProduct(@RequestBody CreateProductRestModel product) {
        String productId;
        try {
            productId = productService.createProduct(product);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorMessage(new Date(), e.getMessage(), "/products"));
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(productId);
    }
}

```

#### Consumer Service

```java
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import com.pessoallegal.webservice.productsmicroservice.rest.CreateProductRestModel;

@Service
public class ProductServiceImpl implements ProductService {

    private KafkaTemplate<String, ProductCreatedEvent> kafkaTemplate;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    public ProductServiceImpl(KafkaTemplate<String, ProductCreatedEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Override
    public String createProduct(CreateProductRestModel productRestModel) {

        String productId = UUID.randomUUID().toString();

        var productCreatedEvent = new ProductCreatedEvent(
                productId,
                productRestModel.getTitle(),
                productRestModel.getPrice(),
                productRestModel.getQuantity());

        CompletableFuture<SendResult<String, ProductCreatedEvent>> future = kafkaTemplate
                .send("product-create-events-topic", productId, productCreatedEvent);

        future.whenComplete((result, exception) -> {
            if (exception != null) {
                logger.error(String.format("******* Failed to send message: %s", exception.getMessage()));
            } else {
                logger.info(String.format("******* Message sent successfully %s", result.getRecordMetadata()));
                logger.info(String.format("******* Partition: %s", result.getRecordMetadata().partition()));
                logger.info(String.format("******* Topic: %s", result.getRecordMetadata().topic()));
                logger.info(String.format("******* Offset: %s", result.getRecordMetadata().offset()));

            }
        });

        // future.join(); // Blocks the current thread and waits for the future result

        return productId;
    }
}

```
