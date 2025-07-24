import mongoose from "mongoose";



const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        source: {
            type: String,
            enum: ['local', 'external'], // distinguish product type
            required: true,
        },
        productId: {
            type: mongoose.Schema.Types.ObjectId, // for local
            ref: 'Product',
            required: function () {
                return this.source === 'local';
            }
        },
        externalProduct: {
            type: Object, // full object for DummyJSON API
            required: function () {
                return this.source === 'external';
            }
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }]
});



export const Cart = mongoose.model("Cart", cartSchema)