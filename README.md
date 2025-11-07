# Ecom — Full-Stack Shopping Cart with Firebase Authentication

This repository contains a complete full-stack shopping cart application named "Ecom" with Firebase authentication.

## Overview

- **Backend:** Node.js + Express + Mongoose (MongoDB) - ES Modules
- **Frontend:** React + Vite + Redux Toolkit + Tailwind CSS
- **Authentication:** Firebase (Email/Password + Google Sign-In)
- **Database:** MongoDB Atlas

## Features

### Backend
✅ RESTful API with 5 endpoints
✅ MongoDB integration with Mongoose
✅ Auto-seeding with 8 products (Unsplash images)
✅ ES6 modules (import/export)

### Frontend
✅ Modern UI with Tailwind CSS
✅ Responsive product grid with hover effects
✅ Sliding cart sidebar
✅ Checkout modal with receipt
✅ Firebase Authentication:
  - Email/Password sign up/sign in
  - Google authentication
  - User profile in navbar
  - Protected user menu

### State Management
✅ Redux Toolkit with async thunks
✅ Products slice
✅ Cart slice with add/remove/update

## Quick Start

### Prerequisites
- Node.js >= 14
- MongoDB (local or Atlas)
- Firebase project (see FIREBASE_SETUP.md)

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd Ecom

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Firebase

1. Follow instructions in `FIREBASE_SETUP.md`
2. Update `frontend/src/firebase/config.js` with your Firebase credentials

### 3. Configure MongoDB

Create `backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start Backend

```bash
cd backend
npm start
```

Backend runs on http://localhost:4000

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on http://localhost:5173

## Project Structure

```
Ecom/
├── backend/
│   ├── models/
│   │   ├── Product.js
│   │   └── CartItem.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductsGrid.jsx
│   │   │   ├── CartSidebar.jsx
│   │   │   ├── CheckoutModal.jsx
│   │   │   └── AuthModal.jsx
│   │   ├── features/
│   │   │   ├── products/productsSlice.js
│   │   │   └── cart/cartSlice.js
│   │   ├── firebase/
│   │   │   └── config.js
│   │   ├── App.jsx
│   │   ├── store.js
│   │   └── index.css
│   └── package.json
├── README.md
├── FIREBASE_SETUP.md
└── SETUP.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| POST | /api/cart | Add/update cart item |
| GET | /api/cart | Get cart items |
| DELETE | /api/cart/:id | Remove cart item |
| POST | /api/checkout | Complete purchase |

## Technologies Used

### Backend
- Express.js
- Mongoose
- MongoDB
- CORS
- dotenv

### Frontend
- React 18
- Vite
- Redux Toolkit
- Tailwind CSS
- Firebase Authentication
- Axios

## Authentication Flow

1. User clicks "Sign In" in navbar
2. Auth modal opens with options:
   - Email/Password (sign up or sign in)
   - Google Sign-In
3. Upon successful authentication:
   - User icon appears in navbar
   - User can access profile menu
   - Sign out option available

## Demo Features to Test

1. **Browse Products** - View 8 products with Unsplash images
2. **Add to Cart** - Click "Add to Cart" on any product
3. **View Cart** - Click cart icon to see sidebar
4. **Update Quantity** - Use +/- buttons
5. **Remove Items** - Click "Remove" button
6. **Authentication**:
   - Sign up with email/password
   - Sign in with Google
   - View user profile
   - Sign out
7. **Checkout** - Complete purchase and see receipt

## Notes

- Variable names follow industry best practices
- Code uses ES6 modules throughout
- Tailwind CSS for modern, responsive design
- Firebase handles all authentication securely
- MongoDB stores products and cart data

## For Assignment Submission

1. Complete Firebase setup (FIREBASE_SETUP.md)
2. Test all features including authentication
3. Take screenshots
4. Record 1-2 min demo video
5. Push to GitHub
6. Submit repo link + video link

## Security

⚠️ **Important:** Never commit real Firebase credentials to public repositories!

Use environment variables for production:
```javascript
// frontend/.env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
// etc.
```

---

Built with ❤️ for Vibe Commerce internship assignment
