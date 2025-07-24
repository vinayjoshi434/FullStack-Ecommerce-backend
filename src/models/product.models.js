import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true,

        },
        productimg: {
            type: String,  //here we use cloudinary url
            required: true,

        },
        listedby: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        price: {
            type: Number,
            required: true
        },
        availabilityStatus: {
            type: String
        },


    }, { timestamps: true })



productSchema.methods.updateProductSchema = async function (updatedProduct, id) {

    const { name, description, stock, category, productimg, price, listedby, availabilityStatus } = updatedProduct

    if (name) this.name = name
    if (description) this.description = description
    if (stock) this.stock = stock
    if (category) this.category = category
    if (productimg) this.productimg = productimg
    if (price) this.price = price
    if (listedby) this.listedby = id
    if (availabilityStatus) this.availabilityStatus = this.availabilityStatus

    return await this.save() // returns the updated document

}


const Product = mongoose.model("Product", productSchema)

export { Product }