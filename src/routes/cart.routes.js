import { Router } from "express";
import { addtocart, updatecartItem, deletecartItem, fetchuserCart, cartDelete } from "../controllers/cart.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
;


const Cartrouter = Router()


//secured Routes

Cartrouter.route("/addtocart").post(verifyJwt, addtocart)
Cartrouter.route("/updatecartItem/:id").patch(verifyJwt, updatecartItem)
Cartrouter.route("/deletecartItem/:id").delete(verifyJwt, deletecartItem)
Cartrouter.route("/fetchuserCart").get(verifyJwt, fetchuserCart)
Cartrouter.route("/cartDelete/:cart_id").delete(verifyJwt, cartDelete)





export { Cartrouter }