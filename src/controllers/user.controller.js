import { ApiError } from "../utils/ApiError.js";
import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/user.models.js";
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js"
import { getInitials } from "../utils/getinitialName.js";



const register = async (req, res) => {
    //  steps to follow while registration
    //1- get the user data for the registration from the frontend
    //2- validate the data first  -not empty
    //3- check if user already exixts: username&email
    //4-  check for images,avatar
    //5-upload them to cloudinary check if avatar
    //6-creates a user object and then creation  callin db
    //7-remove password and refresh token feild from response
    //check for user creation
    //return response

    const { username, name, email, password } = req.body
    if (
        [username, name, email, password].some((feild) => {
            return feild?.trim() === ""

        })
    ) {
        throw new ApiError(400, "All feilds are compulsory/required")

    }

    if (!email.includes("@")) {


        throw new ApiError(400, "Email must contain @")
        // res.status(400).json({
        //     "message": "@feild required in email",
        //     "success": false
        // })

    }

    const defaultavatarinitial = getInitials(name)



    //here in this we use the operator in the mongoose to check both with email and username
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    console.log(existedUser);


    if (existedUser) {
        throw new ApiError(409, "User alredy exists")
    }

    console.log("Received files:", req.files);

    const avatarlocalpath = req.files?.avatar?.[0].path
    console.log(avatarlocalpath);

    let avatar;

    // if (!avatarlocalpath) {
    //     throw new ApiError(400, "avatar is absent")
    // }

    if (avatarlocalpath) {
        avatar = await uploadonCloudinary(avatarlocalpath)
        console.log("in controller getting the response from uploadonCloudinary", avatar);


        if (!avatar) {
            throw new ApiError(400, "error in uplading on cloudinary")
        }

    }


    const user = await User.create({
        username: username.toLowerCase(),
        name,
        email,
        password,
        avatar: avatar?.url || "",
        refreshtoken: "",
        nameinitial: defaultavatarinitial
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registring the user");

    }

    console.log(createdUser);


    res.status(201).json(
        new Apiresponse(
            200,
            createdUser,
            "User Registered Successfully"
        )
    )

    // res.status(200).send("hello")

}


const generateaccess_refreshtoken = async (userid) => {
    try {
        const user = await User.findById(userid)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        // we want refresh token to bestored in db 
        // and we have thet user instance that have all properties and methods

        user.refreshtoken = refreshToken
        await user.save({ validateBeforSave: false })// this is ec=xtra parameter that we pass saying that dont validate the feild like we declare the require in user schema . just do that save with the updation in refresh token
        console.log(typeof (accessToken));


        return { accessToken, refreshToken }



    } catch (error) {
        throw new ApiError(500, "something went wrong while generating the access and refresh token")
    }

}




const login = async (req, res) => {
    //steps
    //get the login data from the frontend email and password
    //check if username and email exists
    // check and validate if the user is exists or not using username and email
    //if exist then check the password using bcrypt
    //generate a access token and refresh token and 
    //send to the user
    //send the response


    console.log("login controller hit");

    const { email, username, password: userenteredpassword } = req.body



    if (!username && !email) {
        throw new ApiError(400, "username and email is required")
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })


    if (!existedUser) {
        throw new ApiError(409, "user is not registered yet")
    }

    const ispasswordvalid = await existedUser.ispasswordcorrect(userenteredpassword)

    if (!ispasswordvalid) {
        throw new ApiError(401, "password incorrect,invalid user credentials ")
    }

    const { accessToken, refreshToken } = await generateaccess_refreshtoken(existedUser._id)
    console.log();


    const userObj = existedUser.toObject()  // converts the mongodb object to normal plain object

    const { password, refreshtoken, ...rest } = userObj

    const loggedinUser = { ...rest }

    console.log(loggedinUser);
    console.log(accessToken);
    console.log(refreshToken);




    //now we send cookies

    const options = {
        httpOnly: true,  // using this will unable only modify by server 
        secure: true
    }

    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new Apiresponse(
            200,
            {
                user: loggedinUser,
                accessToken,
                refreshToken
            },
            "User logged in succesfully"

        ))



}



const logout = async (req, res) => {
    //now here before that executes the middleware inject the user in the request object

    const { _id } = req.user



    const logoutUser = await User.findByIdAndUpdate(_id,
        {
            $set: {
                refreshtoken: undefined
            }
        },
        {
            new: true    // so with this the returned response will be the updated value inwhich refreshtoken is undefined
        }
    )



    const options = {
        httpOnly: true,  // using this will unable only modify by server 
        secure: true
    }
    return res
        .status(201)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new Apiresponse(200, logoutUser, "User logged out"))

}


const fetchme = async (req, res) => {
    const { _id } = req.user

    const user = await User.findById(_id).select(["-password ,-refreshtoken"])

    if (!user) {
        throw new ApiError(400, "cannot get/find  the user")
    }

    res.status(200).json(new Apiresponse(
        200,
        {
            user: user
        },
        "Logged in User found"
    ))
}






const registerUser = asynchandler(register)
const loginUser = asynchandler(login)
const logoutUser = asynchandler(logout)
const currentuser = asynchandler(fetchme)

export { registerUser, loginUser, logoutUser, currentuser }