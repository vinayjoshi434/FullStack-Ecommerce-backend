import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"




const Userschema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,

        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true

        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            required: true
        },
        password: {
            type: String,
            required: [true, "password is required"],
            min: [6, 'Must be at least 6, got{value}'],
            max: [12]
        },
        avatar: {
            type: String,   //here we use cloudinary url
            //required: true
        },
        refreshtoken: {
            type: String
        }


    }, { timestamps: true }
)



// Userschema.pre("save",()=>{       here there is a catch while using the arrow function inside the pre hook because the callback we want is having the context of the Schema so using the arrow function here will lost the context 

// })

Userschema.pre("save", async function (next) {    // now this methodology will always hold the reference of this 
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)

        next()
    }

    return next()
}

)

Userschema.methods.ispasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

Userschema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id, // leftside entry db se aa rahi he
            email: this.email,
            username: this.username

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


Userschema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id, // leftside entry db se aa rahi he
            email: this.email,
            username: this.username
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


//Userschema.plugin(mongooseAggregatePaginate)

export const User = mongoose.model("User", Userschema)