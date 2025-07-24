import { Cart } from "../models/cart.models.js";
import { ApiError } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/Apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";



const add = async (req, res) => {

    //1 extract the _id of the user from the req.user as this is protected by auth middleware
    //2 get the cart data as per the source from req.body
    //3 check the data is present as per the source
    //find and check if the cart exixts for a userid
    //if no then create a new cart instance and  




    const { _id } = req.user
    const { source, productId, externalProduct, quantity } = req.body;
    console.log(externalProduct);


    if (source === 'local' && !productId) {
        return res.status(400).json(new ApiError(400, "local product Id is required"));
    }

    if (source === 'external' && !externalProduct) {
        return res.status(400).json(new ApiError(400, "external api product data is required"));
    }

    let cart = await Cart.findOne({ userId: _id })  //this will check weather the cart is exixts for the user of id=_id

    if (!cart) {
        cart = new Cart({ userId: _id, items: [{ source, productId, externalProduct, quantity }] })
    }

    else {
        const index = cart.items.findIndex((item) => {
            if (source === "local") {
                return String(item.productId) === productId
            }
            else if (source === "external") {
                return (item?.externalProduct?.id) === (externalProduct?.id)
            }
        })
        if (index > -1) {
            // If item exists, update quantity
            cart.items[index].quantity += quantity;
        } else {
            //  If not, push new item
            cart.items.push({ source, productId, externalProduct, quantity });
        }
    }

    //cart.items.push({ source, productId, externalProduct, quantity })

    await cart.save({
        validateBeforeSave: false
    })

    const updatedCart = await Cart.findById(cart._id).populate({
        path: "items.productId",
        model: "Product"
    });

    const formattedItems = updatedCart.items.map(item => {
        const isLocal = item.source === "local";
        return {
            _id: item._id,
            source: item.source,
            quantity: item.quantity,
            product: isLocal ? item.productId : item.externalProduct
        };
    });





    return res.status(201).json(
        new Apiresponse(200,
            {
                items: formattedItems,
                _id: cart._id

            }, "Item Added to cart")
    )

}

const update = async (req, res) => {
    const { _id } = req.user
    const { quantity } = req.body;
    const { id } = req.params    //here  this id is the is of product created under items array in cart 

    console.log(quantity);

    let cart = await Cart.findOne({ userId: _id })  //this will check weather the car tis exixts for the user of id=_id

    const item = await cart.items.id(id);    //here .id() is the moongoose method to find the cart item inside an array cart.items by its _id. it's a Mongoose subdocument array, and each item automatically gets its own _id.

    if (item) {
        item.quantity = quantity;
        await cart.save();

        res.status(200).json(new Apiresponse(200, "Cart item Successfully updated"))
    }
    else {
        throw new ApiError(400, "item not found")
    }

}

const cartitemdelete = async (req, res) => {
    const { _id } = req.user
    const { id } = req.params //here  this id is the is of product created under items array in cart 

    const cart = await Cart.findOne({ userId: _id })

    cart.items = cart.items.filter(item => item._id.toString() !== id)

    await cart.save();

    res.status(200).json(new Apiresponse(200, cart, "cart item is deleted successfully"))

}

const getusercart = async (req, res) => {
    const { _id } = req.user


    let cart = await Cart.findOne({ userId: _id }).populate({
        path: "items.productId", // only local products will be populated
        model: "Product" // your local product model name
    });
    if (!cart) {
        return res.status(404).json(new ApiError(404, "Cart not found"));
    }
    const formattedItems = cart.items.map(item => {
        const isLocal = item.source === "local";
        return {
            _id: item._id,
            source: item.source,
            quantity: item.quantity,
            product: isLocal ? item.productId : item.externalProduct
            // here productId is the full object which is populated by moongoose
        };
    });
    return res.status(200).json(new Apiresponse(200,
        { items: formattedItems, _id: cart._id },
        "Cart fetched successfully"));



}

const deletecart = async (req, res) => {
    const { _id } = req.user
    const { cart_id } = req.params

    if (!cart_id) {
        throw new ApiError(400, "cart Id is not found / undefined")
    }


    const cart = await Cart.findById(cart_id)

    if (!cart) {
        throw new ApiError(404, "cart not found");
    }

    if (String(cart.userId) !== String(_id)) {
        throw new ApiError(403, "Unauthorized to delete this Cart")
    }

    const deletedcart = await Cart.findByIdAndDelete(cart_id)




    res.status(200).json(new Apiresponse(200, deletedcart, "Cart Sucessfully deleted"))
}





const addtocart = asynchandler(add)
const updatecartItem = asynchandler(update)
const deletecartItem = asynchandler(cartitemdelete)
const fetchuserCart = asynchandler(getusercart)
const cartDelete = asynchandler(deletecart)


export { addtocart, updatecartItem, deletecartItem, fetchuserCart, cartDelete }