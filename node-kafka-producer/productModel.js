const Mongoose = require('mongoose');

const productSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

class Product {
    static getProductById(id) {

        return this.findOne({
            _id: Mongoose.mongo.ObjectID(id)
        }).exec();
    }

    static insertProduct({ name }) {

        const product = this({
            name
        });

        return product.save();
    }

    static deleteProduct(productId) {

        return this.deleteOne({
            _id: Mongoose.mongo.ObjectID(productId)
        })
    }
}

productSchema.loadClass(Product);

module.exports = Mongoose.model('Product', productSchema)