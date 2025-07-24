import { Router } from "express";
import { getallproducts, getproductbyid } from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const Productrouter = Router()



Productrouter.route("/all").get(getallproducts)
Productrouter.route("/:productId").get(getproductbyid)

export { Productrouter }