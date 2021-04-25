const Mongoose = require('mongoose');

const orderSchema = new Mongoose.Schema({
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    info: {
        type: String,
        required: true
    }
}, { timestamps: true });

class Order {

    static getOrderById(id) {
        return this.findOne({
            _id: Mongoose.mongo.ObjectID(id)
        }).exec();
    }

    static getOrdersOfProduct(productId) {
        return this.find({
            productId
        }).exec();
    }

    static insertOrder({ productId, quantity, info }) {
        const order = this({
            productId,
            quantity,
            info
        })

        return order.save();
    }

    static deleteOrders(productId) {
        return this.deleteMany({
            productId: productId
        }).exec();
    }

}

orderSchema.loadClass(Order);

module.exports = Mongoose.model('Order', orderSchema)