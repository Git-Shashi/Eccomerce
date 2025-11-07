# Ecom Store - Full Stack E-Commerce Application# Ecom — Full-Stack Shopping Cart with Firebase Authentication



A modern, full-stack e-commerce web application built with React, Redux, Node.js, Express, MongoDB, and Firebase Authentication. Features a beautiful Tailwind CSS UI with 35+ products across multiple categories.This repository contains a complete full-stack shopping cart application named "Ecom" with Firebase authentication.



![E-Commerce Store](https://img.shields.io/badge/Stack-MERN-green) ![Firebase](https://img.shields.io/badge/Auth-Firebase-orange) ![Tailwind](https://img.shields.io/badge/UI-Tailwind-blue)## Overview



## ✨ Features- **Backend:** Node.js + Express + Mongoose (MongoDB) - ES Modules

- **Frontend:** React + Vite + Redux Toolkit + Tailwind CSS

- 🛍️ **Product Catalog**: Browse 35+ products across categories (Watches, Laptops, Phones, Clothing, Accessories)- **Authentication:** Firebase (Email/Password + Google Sign-In)

- 🛒 **Shopping Cart**: Add, update, and remove items with real-time cart updates- **Database:** MongoDB Atlas

- 🔐 **Firebase Authentication**: Sign up/Sign in with email/password or Google account

- 💳 **Checkout System**: Complete orders with receipt generation## Features

- 💰 **Indian Rupee (₹) Pricing**: All prices displayed in INR

- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS### Backend

- 🎨 **Modern UI**: Beautiful animations and hover effects✅ RESTful API with 5 endpoints

- 👤 **User Profile**: User menu with profile management✅ MongoDB integration with Mongoose

- 📊 **Redux State Management**: Centralized state for products and cart✅ Auto-seeding with 8 products (Unsplash images)

✅ ES6 modules (import/export)

## 🚀 Tech Stack

### Frontend

### Frontend✅ Modern UI with Tailwind CSS

- **React 18.2.0** - UI library✅ Responsive product grid with hover effects

- **Redux Toolkit 1.9.5** - State management✅ Sliding cart sidebar

- **Vite 5.0.0** - Build tool and dev server✅ Checkout modal with receipt

- **Tailwind CSS 4.1.17** - Styling✅ Firebase Authentication:

- **Firebase 12.5.0** - Authentication  - Email/Password sign up/sign in

  - Google authentication

### Backend  - User profile in navbar

- **Node.js** - Runtime environment  - Protected user menu

- **Express 4.18.2** - Web framework

- **MongoDB** - Database (MongoDB Atlas)### State Management

- **Mongoose 7.0.0** - MongoDB ODM✅ Redux Toolkit with async thunks

- **ES6 Modules** - Modern JavaScript✅ Products slice

✅ Cart slice with add/remove/update

## � Project Structure

```
Ecom/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── package.json             # Backend dependencies
│   ├── .env                     # Environment variables (not in git)
│   ├── .env.example             # Environment template
│   ├── data/
│   │   └── products.js          # Sample product data (35 items)
│   ├── middleware/
│   │   └── errorHandler.js      # Global error handling & 404
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   └── CartItem.js          # Cart item schema
│   └── routes/
│       ├── products.js          # Product routes (GET, seed)
│       ├── cart.js              # Cart routes (GET, POST, DELETE)
│       └── checkout.js          # Checkout route (POST)
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env                     # Environment variables (not in git)
│   ├── .env.example             # Environment template
│   └── src/
│       ├── main.jsx             # React entry point
│       ├── App.jsx              # Main app component
│       ├── store.js             # Redux store configuration
│       ├── components/
│       │   ├── Navbar.jsx       # Navigation with auth
│       │   ├── ProductsGrid.jsx # Product display
│       │   ├── CartSidebar.jsx  # Shopping cart
│       │   ├── CheckoutModal.jsx # Checkout form
│       │   ├── AuthModal.jsx    # Login/signup
│       │   └── Footer.jsx       # Site footer
│       ├── features/
│       │   ├── products/
│       │   │   └── productsSlice.js # Products state
│       │   └── cart/
│       │       └── cartSlice.js     # Cart state
│       └── firebase/
│           └── config.js        # Firebase initialization
└── README.md
```

## 🏗️ Architecture

### Backend (Modular MVC Pattern)

- **Routes**: Separated into individual files for better organization
  - `products.js` - Product listing and seeding
  - `cart.js` - Cart management (CRUD operations)
  - `checkout.js` - Order processing and receipt generation
  
- **Models**: Mongoose schemas for data validation
  - `Product` - Product information
  - `CartItem` - Shopping cart items
  
- **Middleware**: Reusable middleware functions
  - Error handling with detailed error messages
  - 404 route handler
  - Environment-aware error responses
  
- **Data**: Centralized data management
  - Sample products exported from `data/products.js`
  - 35 products with real Unsplash images

### Frontend (React + Redux)

- **Component-Based Architecture**: Reusable React components
- **State Management**: Redux Toolkit with slices
- **Async Operations**: Redux Thunks for API calls
- **Styling**: Tailwind CSS with custom animations
- **Authentication**: Firebase integration with protected routes

## �📋 Prerequisites

## Quick Start

Before running this project, make sure you have the following installed:

### Prerequisites

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)- Node.js >= 14

- **npm** or **yarn** - Package manager (comes with Node.js)- MongoDB (local or Atlas)

- **MongoDB** - Either local installation or MongoDB Atlas account- Firebase project (see FIREBASE_SETUP.md)

- **Git** - Version control

### 1. Clone & Install

## 🔧 Installation & Setup

```bash

### 1. Clone the Repositorygit clone <your-repo-url>

cd Ecom

```bash

git clone https://github.com/Git-Shashi/Eccomerce.git# Install backend dependencies

cd Eccomercecd backend

```npm install



### 2. Backend Setup# Install frontend dependencies

cd ../frontend

```bashnpm install

# Navigate to backend folder```

cd backend

### 2. Configure Firebase

# Install dependencies

npm install1. Follow instructions in `FIREBASE_SETUP.md`

2. Update `frontend/src/firebase/config.js` with your Firebase credentials

# Create .env file

touch .env### 3. Configure MongoDB

```

Create `backend/.env`:

**Configure `.env` file** in the `backend` folder:```

MONGODB_URI=your_mongodb_connection_string

```env```

MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/ecom

PORT=4000### 4. Start Backend

```

```bash

> **Note**: Replace with your MongoDB Atlas connection string or use `mongodb://127.0.0.1:27017/ecom` for local MongoDBcd backend

npm start

### 3. Frontend Setup```



```bashBackend runs on http://localhost:4000

# Navigate to frontend folder (from project root)

cd frontend### 5. Start Frontend



# Install dependencies```bash

npm installcd frontend

npm run dev

# Create .env file```

touch .env

```Frontend runs on http://localhost:5173



**Configure `.env` file** in the `frontend` folder:## Project Structure



```env```

VITE_API_URL=http://localhost:4000Ecom/

```├── backend/

│   ├── models/

### 4. Firebase Setup (Authentication)│   │   ├── Product.js

│   │   └── CartItem.js

The Firebase configuration is already set up in `frontend/src/firebase/config.js`. The project uses:│   ├── server.js

- Email/Password authentication│   ├── package.json

- Google Sign-In│   └── .env

├── frontend/

> **Optional**: To use your own Firebase project, update the config in `frontend/src/firebase/config.js`│   ├── src/

│   │   ├── components/

## ▶️ Running the Application│   │   │   ├── Navbar.jsx

│   │   │   ├── ProductsGrid.jsx

### Start Backend Server│   │   │   ├── CartSidebar.jsx

│   │   │   ├── CheckoutModal.jsx

```bash│   │   │   └── AuthModal.jsx

# From the backend folder│   │   ├── features/

cd backend│   │   │   ├── products/productsSlice.js

npm start│   │   │   └── cart/cartSlice.js

```│   │   ├── firebase/

│   │   │   └── config.js

The backend server will start on **http://localhost:4000**│   │   ├── App.jsx

│   │   ├── store.js

You should see:│   │   └── index.css

```│   └── package.json

Connecting to MongoDB...├── README.md

Connected to MongoDB├── FIREBASE_SETUP.md

Backend server started on port 4000└── SETUP.md

Products seeded (if database was empty)```

```

## API Endpoints

### Start Frontend Development Server

| Method | Endpoint | Description |

Open a **new terminal** window:|--------|----------|-------------|

| GET | /api/products | Get all products |

```bash| POST | /api/cart | Add/update cart item |

# From the frontend folder| GET | /api/cart | Get cart items |

cd frontend| DELETE | /api/cart/:id | Remove cart item |

npm run dev| POST | /api/checkout | Complete purchase |

```

## Technologies Used

The frontend will start on **http://localhost:5173**

### Backend

You should see:- Express.js

```- Mongoose

VITE v5.4.21 ready in XXX ms- MongoDB

➜  Local:   http://localhost:5173/- CORS

```- dotenv



### 5. Open in Browser### Frontend

- React 18

Navigate to **http://localhost:5173** in your web browser.- Vite

- Redux Toolkit

## 🎯 Using the Application- Tailwind CSS

- Firebase Authentication

1. **Browse Products**: View 35+ products with images and descriptions- Axios

2. **Sign Up/Sign In**: Click the "Sign In" button to create an account or log in

   - Use email/password## Authentication Flow

   - Or sign in with Google

3. **Add to Cart**: Click "Add to Cart" on any product1. User clicks "Sign In" in navbar

4. **View Cart**: Click the cart icon to see your items2. Auth modal opens with options:

5. **Update Quantities**: Use +/- buttons to adjust quantities   - Email/Password (sign up or sign in)

6. **Checkout**: Click "Proceed to Checkout" and fill in your details   - Google Sign-In

7. **Order Confirmation**: View your order receipt with order ID3. Upon successful authentication:

   - User icon appears in navbar

## 📁 Project Structure   - User can access profile menu

   - Sign out option available

```

Ecom/## Demo Features to Test

├── backend/

│   ├── models/1. **Browse Products** - View 8 products with Unsplash images

│   │   ├── Product.js          # Product schema2. **Add to Cart** - Click "Add to Cart" on any product

│   │   └── CartItem.js         # Cart item schema3. **View Cart** - Click cart icon to see sidebar

│   ├── server.js               # Express server & API routes4. **Update Quantity** - Use +/- buttons

│   ├── package.json5. **Remove Items** - Click "Remove" button

│   └── .env                    # Environment variables6. **Authentication**:

│   - Sign up with email/password

├── frontend/   - Sign in with Google

│   ├── src/   - View user profile

│   │   ├── components/   - Sign out

│   │   │   ├── Navbar.jsx      # Navigation with auth7. **Checkout** - Complete purchase and see receipt

│   │   │   ├── ProductsGrid.jsx # Product display

│   │   │   ├── CartSidebar.jsx  # Shopping cart## Notes

│   │   │   ├── CheckoutModal.jsx # Checkout form

│   │   │   ├── AuthModal.jsx    # Login/Signup- Variable names follow industry best practices

│   │   │   └── Footer.jsx       # Footer with links- Code uses ES6 modules throughout

│   │   ├── features/- Tailwind CSS for modern, responsive design

│   │   │   ├── products/- Firebase handles all authentication securely

│   │   │   │   └── productsSlice.js # Redux products- MongoDB stores products and cart data

│   │   │   └── cart/

│   │   │       └── cartSlice.js     # Redux cart## For Assignment Submission

│   │   ├── firebase/

│   │   │   └── config.js       # Firebase setup1. Complete Firebase setup (FIREBASE_SETUP.md)

│   │   ├── App.jsx             # Main app component2. Test all features including authentication

│   │   ├── store.js            # Redux store3. Take screenshots

│   │   └── main.jsx            # Entry point4. Record 1-2 min demo video

│   ├── package.json5. Push to GitHub

│   └── .env                    # Environment variables6. Submit repo link + video link

│

└── README.md                   # This file## Security

```

⚠️ **Important:** Never commit real Firebase credentials to public repositories!

## 🔌 API Endpoints

Use environment variables for production:

| Method | Endpoint | Description |```javascript

|--------|----------|-------------|// frontend/.env

| GET | `/api/products` | Get all products |VITE_FIREBASE_API_KEY=your_key

| GET | `/api/cart` | Get cart items |VITE_FIREBASE_AUTH_DOMAIN=your_domain

| POST | `/api/cart` | Add/update cart item |// etc.

| DELETE | `/api/cart/:id` | Remove cart item |```

| POST | `/api/checkout` | Process checkout |

| GET | `/api/seed` | Re-seed products (dev only) |---



## 🗄️ Database SchemaBuilt with ❤️ for Vibe Commerce internship assignment


### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,        // In Indian Rupees (₹)
  imageUrl: String,
  createdAt: Date
}
```

### CartItem Model
```javascript
{
  product: ObjectId,    // Reference to Product
  quantity: Number
}
```

## 🛠️ Development Commands

### Backend
```bash
npm start          # Start server
npm run dev        # Start with nodemon (if configured)
```

### Frontend
```bash
npm run dev        # Start Vite dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check username/password in connection string
- Whitelist your IP in MongoDB Atlas

### Port Already in Use
```bash
# Kill process on port 4000 (backend)
lsof -ti:4000 | xargs kill -9

# Kill process on port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Firebase Auth Not Working
- Check Firebase configuration in `frontend/src/firebase/config.js`
- Ensure Email/Password and Google providers are enabled in Firebase Console
- Check browser console for errors

### Images Not Loading
- Images are fetched from Unsplash CDN
- Ensure you have an active internet connection
- Check browser console for CORS errors

## 📦 Production Deployment

### Backend (Recommended: Render/Railway/Heroku)
1. Set environment variables in hosting platform
2. Deploy from GitHub repository
3. Update `VITE_API_URL` in frontend to production backend URL

### Frontend (Recommended: Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy `dist` folder to hosting platform
3. Set environment variable: `VITE_API_URL`

### Database
- Use MongoDB Atlas for production
- Update connection string in backend `.env`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Shashi Bhushan**
- GitHub: [@Git-Shashi](https://github.com/Git-Shashi)
- Repository: [Eccomerce](https://github.com/Git-Shashi/Eccomerce)

## 🙏 Acknowledgments

- Product images from [Unsplash](https://unsplash.com)
- Icons and UI inspiration from modern e-commerce platforms
- Built as part of Vibe Commerce internship assignment

---

**Happy Coding! 🚀**

If you found this project helpful, please give it a ⭐️
