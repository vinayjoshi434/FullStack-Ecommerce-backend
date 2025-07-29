import { Router } from "express";
import { currentuser, loginUser, logoutUser, registerUser, } from "../controllers/user.controller.js";
import { productlisting, userproducts } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { uploadProductImg } from "../middlewares/multer.middleware.js"

const Userrouter = Router()

Userrouter.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }


    ]),
    registerUser)

Userrouter.route("/login").post(loginUser)


//secured routes/protectedroute
Userrouter.route("/logout").get(verifyJwt, logoutUser)
Userrouter.route("/me").get(verifyJwt, currentuser)




Userrouter.route("/addproduct").post(
    verifyJwt,
    uploadProductImg.fields([
        {
            name: "productimg",
            maxCount: 1
        }
    ]),
    productlisting

)

Userrouter.route("/getallproductsbyuser").get(
    verifyJwt, userproducts
)





export { Userrouter }