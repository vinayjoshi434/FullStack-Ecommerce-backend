import cors from "cors"
import cookieParser from "cookie-parser"
import express from 'express'

import errorHandler from "./middlewares/globalErrorhandler.middleware.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

}))



console.log("CORS_ORIGIN loaded from .env:", process.env.CORS_ORIGIN);

app.use(express.json({ limit: "210kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));// here extended true is for accepting the nested object
app.use(express.static("public"));
app.use(cookieParser());


//routes import 
import { Userrouter } from "./routes/user.routes.js";
import { Cartrouter } from "./routes/cart.routes.js";
import { Productrouter } from "./routes/product.routes.js";


//route declaration

app.use("/api/v1/users", Userrouter)

app.use("/api/v1/cart", Cartrouter)

app.use("/api/v1/product", Productrouter)


app.use(errorHandler)
export { app }