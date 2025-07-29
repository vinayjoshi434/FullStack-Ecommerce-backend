# FullStack-Ecommerce-backend

# 🛍️ ShoppyGlobe – Full Stack E-commerce Application

ShoppyGlobe is a full-stack e-commerce web application built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. This backend serves secure and scalable REST APIs for product browsing, cart operations, and user authentication.

---

## 📌 Features

### 🔐 Authentication & Authorization

- Register & Login with JWT token-based authentication
- Protected routes (Cart APIs) accessible only by logged-in users

User routes

~ post /api/users/register - To register the user

~ post /api/users/login - to Login the User

~ get /api/users/logout - To logout the user

~get /api/users/me - To fetch user

### 🛒 Cart Management (Protected)

- `POST /api/cart/addtocart` - Add product to cart
- `PATCH /api/cart/updatecartItem/:id` - To update the cart item
- `DELETE /api/cart/cartDelete/:cart_id` - Add delete to cart
- `GET /api/cart/fetchuserCart` - fetch User Cart
- `DELETE /api/cart/deletecartItem/:id` - Remove product from cart

### 🛍️ Product APIs

- `GET /api/product/all` - Fetch all products
- `GET /api/product/:productId` - Fetch product details by ID
- `POST /api/users/addproduct` - add product
- `GET /api/users/getallproductsbyuser` - get products by user

---

## 🧩 Tech Stack

| Technology        | Description           |
| ----------------- | --------------------- |
| **Node.js**       | JavaScript runtime    |
| **Express.js**    | Web framework         |
| **MongoDB**       | NoSQL database        |
| **Mongoose**      | ODM for MongoDB       |
| **JWT**           | Secure authentication |
| **ThunderClient** | API testing           |
| **bcryptjs**      | Password hashing      |

---

## 📁 Project Structure

📦 ecom-backend
├── 📂 controllers
│ └── authController.js
│ └── productController.js
│ └── cartController.js
├── 📂 models
│ └── User.js
│ └── Product.js
│ └── Cart.js
├── 📂 routes
│ └── authRoutes.js
│ └── productRoutes.js
│ └── cartRoutes.js
├── 📂 middleware
│ └── authMiddleware.js
│ └── errorHandler.js
├── 📄 .env
├── 📄 server.js
├── 📄 package.json

---

## 🔐 Environment Variables

Create a `.env` file in your root with the following variables:

```env
PORT=5050
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret



🚀 Getting Started
📦 Install dependencies


npm install
🧪 Run server

npm run start
Server runs on http://localhost:5050
```

Key Points about the project

1. Here i use both name and Username while registering the user so that clearity user section

2. I prefer to upload the avatar feild at the time of register and if the user doesnot want or fail to select the avatar img then as a fall back sourece i store the name initials for that user

3. In each step i try to segeragate the things so that for the specific purpose file are place in the specific folder this leads to the code redability

4. I this project i use custom Utility class like ApiResponse ,ApiError so that we need not write the json structure repeateadly simply we use the class where needed

5. Under middleware section i create the global middleware which is placed at the end of all the routes defined so that inside the controller whenever we throw new ApiError then it will handeled by this middleware

6 Addditionally i use the wrapper hogher order function asynchandler,that handeles the error and response gracefully

7. Under User model I defined the method there . which is the option we have in mongoose to define the document specific method which we can use in the controller logic

8. here i install prettier as a dev dependency just for the clean and universal formatting

🧠 Learning Outcomes
Through building the ShoppyGlobe E-commerce Backend using Node.js, Express, and MongoDB, I gained hands-on experience with:

🔧 Backend Development & Architecture
Designed a RESTful API using Express.js with modular route and controller structure.

Followed MVC principles for scalable code architecture.

Used ES6 module syntax (import/export) across the project for modern JavaScript practices.

🛢️ MongoDB & Mongoose
Designed Mongoose schemas with field validations and relationships.

Performed CRUD operations on products, users, and cart collections.

Handled MongoDB errors (e.g., duplicate keys) gracefully with custom error handling.

🔐 Authentication & Authorization
Implemented JWT-based authentication for login and protected routes.

Used middleware to verify tokens and restrict unauthorized access.

☁️ File Uploads & Cloudinary
Integrated Cloudinary for product and user avatar image uploads.

Managed local and cloud image storage with fallbacks.

🔄 Session & Token Handling
Implemented refresh tokens and cookie-based storage using httpOnly flags for enhanced security.

⚠️ Error Handling
Built centralized custom error handlers using an ApiError utility class.

Sent consistent and meaningful responses across endpoints.

🧪 API Testing & Validation
Validated all routes using postman and MongoDB Atlas.

Manually tested corner cases and verified error handling responses.

📁 Git
Maintained clean and structured Git history with .env, gitignore, and production-ready configs.
