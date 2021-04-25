const orderModel = require('./orderModel');

module.exports = (app) => {
    app.get('/order/:orderId', async (req, res) => {
        try {
            const orderId = req.params.orderId;

            const orderCollection = await orderModel.getOrderById(orderId);

            res.status(200).send({
                success: true,
                data: orderCollection,
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
    })

    app.post('/insertOrder', async (req, res) => {
        try {
            const order = {
                quantity: req.body.quantity,
                info: req.body.info,
                productId: req.body.productId
            }

            const orderCollection = await orderModel.insertOrder(order);

            res.status(200).send({
                success: true,
                data: orderCollection,
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
    })


}