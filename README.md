# FullStack-Ecommerce-backend

# 🛍️ ShoppyGlobe – Full Stack E-commerce Application

ShoppyGlobe is a full-stack e-commerce web application built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**. This backend serves secure and scalable REST APIs for product browsing, cart operations, and user authentication.

---

## 📌 Features

### 🔐 Authentication & Authorization

- Register & Login with JWT token-based authentication
- Protected routes (Cart APIs) accessible only by logged-in users

### 🛒 Cart Management (Protected)

- `POST /cart` - Add product to cart
- `PUT /cart/:productId` - Update quantity of product in cart
- `DELETE /cart/:productId` - Remove product from cart

### 🛍️ Product APIs

- `GET /products` - Fetch all products
- `GET /products/:id` - Fetch product details by ID

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
