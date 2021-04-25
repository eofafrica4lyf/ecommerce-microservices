# E-commerce MicroService - Event Sourcing Implementation using Node.js,Kafka

### Technologies Used

    - Node.js
    - Kafka
    - MongoDB


### Dependencies

    - [Node.js](https://nodejs.org/en/download/)
    - [Kafka](https://kafka.apache.org/downloads)


### To Run Application

#### Kafka

```

$ bin/zookeeper-server-start.sh config/zookeeper.properties

On a different terminal session
$ bin/kafka-server-start.sh config/server.properties

On a different terminal session
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic feed-service

```

#### Producer - Product Service
```

$ cd products-service/
$ npm i 
$ node server.js

```

#### Consumer - Order Service
```

$ cd orders-service/
$ npm i
$ node server.js

```