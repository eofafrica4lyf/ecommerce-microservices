const kafka = require('kafka-node');
const util = require('util');
const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const app = express();

const orderModel = require('./orderModel');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient('localhost:2181');
  let consumer = new Consumer(
    client,
    [{ topic: 'feed-service', partition: 0 }],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: 'utf8',
      fromOffset: false
    }
  );
  consumer.on('message', async function (message) {
    const consumerdata = JSON.parse(message.value);

    if (consumerdata.type === 'DELETE_PRODUCT_ORDERS') {
      const deleteStatus = await orderModel.deleteOrders(consumerdata.data);
    }
  });
  consumer.on('error', function (err) {
    console.log('error', err);
  });
}
catch (e) {
  console.log(e);
}

mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true })
  .then((err, res) => {
    console.log("mongodb is connected successfuly");
    require('./routes')(app);
  })
  .catch(err => {
    console.log("Error => ", err);
  })

app.listen(4568, () => {
  console.log("Server is listening to port 4568");
})