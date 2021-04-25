# MicroService - Event Sourcing Implementation using Node.js,Kafka

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

```

#### Producer - Product Service
```

$ cd product-service/
$ npm i 
$ node server.js

```

#### Consumer - Order Service
```

$ cd order-service/
$ npm i
$ node server.js

```