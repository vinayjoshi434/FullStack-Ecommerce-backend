import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { asynchandler } from "../utils/asynchandler.js"
import jwt from "jsonwebtoken"



export const verifyJwt = asynchandler(async (req, res, next) => {
    try {
        //since cookie are two way accessible 
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        // by this way we extract the cookie either from cookie or from request header

        console.log(token);




        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        //now we check is the token is valid and what info it have since when we generate it it consist of _id,email,username

        const decodedinfo = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,)

        const user = await User.findById(decodedinfo._id).select(" -password  -refereshtoken")

        if (!user) {
            throw new ApiError(401, "invalid access token")
        }


        // now we will add new on reuest object

        req.user = user
        next()

    } catch (error) {
        throw new ApiError(401, error?.message || "invalid Access token")
    }


}
)