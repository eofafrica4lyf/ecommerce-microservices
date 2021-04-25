const productModel = require('./productModel');

module.exports = (app, producer, kafka_topic) => {
    app.get('/getProduct/:productId', async (req, res) => {
        try {
            const productId = req.params.productId;

            const productCollection = await productModel.getProductById(productId);

            res.status(200).send({
                success: true,
                data: productCollection,
                error: null
            })
        }
        catch (e) {
            console.log(e);

            res.status.send({
                success: false,
                data: null,
                error: e
            })
        }
    })

    app.post('/insertProduct', async (req, res) => {
        const product = {
            name: req.body.name
        }

        try {
            const productCollection = await productModel.insertProduct(product);

            res.status(200).send({
                success: true,
                data: productCollection,
                error: null
            })
        }
        catch (e) {
            console.log(e);

            res.status(500).send({
                success: false,
                data: null,
                error: e
            })
        }
    });

    app.post('/deleteProduct', async (req, res) => {
        try {
            const productId = req.body.productId;

            let productCollection = await productModel.getProductById(productId);

            if (productCollection) {
                productCollection = productCollection.toObject();
                let payload = [{
                    topic: kafka_topic,
                    messages: JSON.stringify({
                        type: "DELETE_PRODUCT_ORDERS",
                        data: productCollection._id
                    })
                }]

                producer.send(payload, (err, data) => {
                    if (err) {
                        console.log('[kafka-producer -> ' + kafka_topic + ']: broker update failed')
                    }

                    console.log('[kafka-producer -> ' + kafka_topic + ']: broker update success', data);
                })

                await productModel.deleteProduct(productId);

                res.status(200).send({
                    success: true,
                    data: "Deleted Successfully",
                    error: null
                })

            }
            else {
                res.status(404).send({
                    success: false,
                    data: null,
                    error: "Not Found"
                })
            }
        }
        catch (e) {
            console.log(e);

            res.status(500).send({
                success: false,
                data: null,
                error: e
            })
        }
    })

}

