
import { Product } from "../models/product.models.js"

import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { log } from "console";






const addproduct = async (req, res) => {
    const { _id } = req.user
    console.log("add product");

    const { title, description, stock, category, price } = req.body

    console.log(req.body);

    let availablestatus
    if (stock === 0) availablestatus = "Out of Stock"
    else if (stock < 20) availablestatus = "Low Stock"
    else availablestatus = "In Stock"




    console.log("🚀 Controller reached");
    console.log("📁 req.files:", req.files);

    const productimglocalpath = req.files?.productimg?.[0].path

    if (!productimglocalpath) {
        throw new ApiError(400, "Files are required .Absent in controller")
    }

    const productimgcloudinary = await uploadonCloudinary(productimglocalpath)

    if (!productimgcloudinary) {
        throw new ApiError(400, "error in uploading on cloudinary")
    }


    const product = await Product.create({
        title,
        description,
        stock,
        category,
        price,
        productimg: productimgcloudinary.url || "",
        listedby: _id,
        availabilityStatus: availablestatus

    })
    if (!product) {
        throw new ApiError(400, "Something went wrong while uploading the product")
    }

    return res.status(200).json(
        new Apiresponse(200, product, "User  Successfully uploaded product ")
    )
}


const productbyuser = async (req, res) => {
    const { _id } = req.user

    const products = await Product.find({ listedby: _id }).sort({ createdAt: -1 })
    // here products is an array of individual project object

    if (products.length === 0) {
        throw new ApiError(404, "You have not list any product yet.");
    }


    res.status(200).json(new Apiresponse(200,
        products,
        "Fetched your listed products"));
}


const productbyid = async (req, res) => {
    const { productId } = req.params


    const product = await Product.findById(productId).populate("listedby", "username avatar name")

    if (!product) {
        throw new ApiError(404, "Product not Found")
    }

    res.status(200).json(new Apiresponse(200, product, "Product Fetched"))


}



// this is public so anyone can see the products
const allproducts = async (req, res) => {


    const products = await Product.find()

    if (!products) {
        throw new ApiError(404, "Error occure in finding the products")
    }

    res.status(200).json(new Apiresponse(200, products, "All products Fetched"))


}



const productlisting = asynchandler(addproduct)
const userproducts = asynchandler(productbyuser)
const getallproducts = asynchandler(allproducts)
const getproductbyid = asynchandler(productbyid)

export { productlisting, userproducts, getallproducts, getproductbyid }