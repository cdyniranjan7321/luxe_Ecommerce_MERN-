# LUXE — MERN Stack Clothes E-commerce

A full-stack clothing e-commerce app built with **MongoDB, Express, React, Node.js**, and **Tailwind CSS**.

## Features

- Product catalog with category filter, search, and pagination
- Product detail page with size/color selection
- Cart (persisted in localStorage) and checkout flow
- JWT authentication (register/login)
- Order placement and order history
- Admin panel: add/edit/delete products, manage order status
- Responsive, clean Tailwind UI

## Project structure

```
mern-ecommerce/
├── backend/
│   ├── config/db.js
│   ├── controllers/        # auth, product, order logic
│   ├── middleware/         # JWT auth, error handling
│   ├── models/             # User, Product, Order (Mongoose)
│   ├── routes/              # /api/auth, /api/products, /api/orders
│   ├── seed/seedProducts.js # sample product data
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/axios.js     # axios instance w/ auth token
    │   ├── components/      # Navbar, Footer, ProductCard, PrivateRoute
    │   ├── context/         # AuthContext, CartContext
    │   ├── pages/           # Home, ProductDetail, Cart, Checkout, Login,
    │   │                     # Register, Orders, OrderDetail, Admin
    │   ├── App.jsx
    │   └── main.jsx
    ├── tailwind.config.js
    └── package.json
```

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env: set MONGO_URI (local Mongo or MongoDB Atlas) and a JWT_SECRET
npm run dev          # starts on http://localhost:5000
```

Seed sample products:

```bash
node seed/seedProducts.js
```

To create an admin user: register normally via the app, then in your Mongo
database set that user's `isAdmin` field to `true` (e.g. via `mongosh` or
MongoDB Compass).

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if your backend runs somewhere other than localhost:5000
npm run dev           # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so
both servers just need to be running side by side.

### 3. Build for production

```bash
cd frontend
npm run build         # outputs static files to frontend/dist
```
Serve `frontend/dist` with any static host (Vercel/Netlify) and deploy
`backend/` to a Node host (Render/Railway/Fly.io) with your MongoDB URI
(e.g. from MongoDB Atlas) set as an environment variable.

## API summary

| Method | Route                        | Description                | Auth       |
|--------|-------------------------------|-----------------------------|------------|
| POST   | /api/auth/register            | Register user               | -          |
| POST   | /api/auth/login               | Login                       | -          |
| GET    | /api/auth/profile             | Get own profile             | User       |
| GET    | /api/products                 | List products (search/filter/pagination) | - |
| GET    | /api/products/:id             | Get product                 | -          |
| POST   | /api/products                 | Create product              | Admin      |
| PUT    | /api/products/:id             | Update product              | Admin      |
| DELETE | /api/products/:id             | Delete product               | Admin      |
| POST   | /api/products/:id/reviews     | Add review                  | User       |
| POST   | /api/orders                   | Place order                 | User       |
| GET    | /api/orders/myorders          | Own order history           | User       |
| GET    | /api/orders/:id               | Get order                   | User       |
| GET    | /api/orders                   | All orders                  | Admin      |
| PUT    | /api/orders/:id/status        | Update order status          | Admin      |

## Notes: next steps to add following

- Real payment integration (Stripe/Razorpay) — currently payment method is just recorded, not processed
- Image uploads (Cloudinary/S3) instead of pasting image URLs in the admin form
- Product reviews UI on the product detail page (backend endpoint already exists)
- Email confirmations for orders
