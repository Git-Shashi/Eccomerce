# Firebase Authentication Testing Guide

## ✅ Server Status

**Backend:** Running on http://localhost:4000  
**Frontend:** Running on http://localhost:5173  
**Database:** Connected to MongoDB Atlas  
**Firebase:** Configured and ready

---

## 🔥 Firebase Authentication Testing

### Test 1: Sign Up with Email/Password

1. **Open** http://localhost:5173
2. **Click** "Sign In" button in the top-right navbar
3. **Click** "Sign Up" link at the bottom of the modal
4. **Fill in:**
   - Full Name: Your Name
   - Email: test@example.com
   - Password: test123 (minimum 6 characters)
5. **Click** "Sign Up"
6. **Expected Result:**
   - Modal closes
   - User icon appears in navbar showing your email initial
   - Navbar shows "Sign In" button replaced with user menu

### Test 2: Google Sign-In

1. **Click** "Sign In" button
2. **Click** "Sign in with Google" button (blue button with Google logo)
3. **Select** your Google account
4. **Expected Result:**
   - Redirected back to app
   - User icon shows your Google profile picture
   - Navbar displays your Google name

### Test 3: User Profile Menu

1. **Click** the user icon in navbar (after signing in)
2. **Expected Result:**
   - Dropdown menu appears showing:
     - Your display name
     - Your email address
     - "Sign Out" button

### Test 4: Sign Out

1. **Click** user icon
2. **Click** "Sign Out"
3. **Expected Result:**
   - User menu closes
   - Navbar shows "Sign In" button again
   - You are logged out

### Test 5: Sign In with Existing Account

1. **Click** "Sign In"
2. **Ensure** you're on "Sign In" mode (not "Sign Up")
3. **Enter** email and password from Test 1
4. **Click** "Sign In"
5. **Expected Result:**
   - Successfully signed in
   - User icon appears

---

## 🎯 Features to Verify

### Authentication UI
- ✅ Modern auth modal with Tailwind CSS
- ✅ Toggle between Sign In / Sign Up
- ✅ Form validation (email format, password length)
- ✅ Error messages display for invalid credentials
- ✅ Loading state during authentication
- ✅ Google Sign-In button with proper branding

### Navbar Integration
- ✅ "Sign In" button when logged out
- ✅ User icon when logged in
- ✅ Profile picture (Google) or initial letter (email)
- ✅ Dropdown menu on user icon click
- ✅ Display name and email in menu
- ✅ Sign Out functionality

### State Persistence
- ✅ User stays logged in on page refresh
- ✅ Firebase manages session automatically
- ✅ Cart data persists across sessions

---

## 🐛 Common Issues & Solutions

### Issue: "Firebase auth not initialized"
**Solution:** Check that Firebase config in `frontend/src/firebase/config.js` has valid credentials

### Issue: Google Sign-In popup blocked
**Solution:** Allow popups in browser for localhost:5173

### Issue: "Invalid email or password"
**Solution:** Ensure:
- Email is valid format
- Password is at least 6 characters
- Account exists (for sign in) or doesn't exist (for sign up)

### Issue: Authentication state not persisting
**Solution:** Clear browser cache and reload

---

## 📸 Screenshot Checklist

Capture these screens for your assignment:

1. **Home page** - Products grid with navbar showing "Sign In"
2. **Auth Modal** - Sign up form
3. **Logged in** - Navbar with user icon
4. **User Menu** - Dropdown showing profile
5. **Cart** - Sidebar with items
6. **Checkout** - Modal with form
7. **Receipt** - Success screen after checkout

---

## 🎥 Demo Video Script

**Duration:** 1-2 minutes

1. **Intro (10s):** "This is Ecom, a full-stack shopping cart with Firebase authentication"
2. **Sign Up (15s):** Show creating new account with email
3. **Browse Products (10s):** Scroll through product grid
4. **Add to Cart (15s):** Add 2-3 items to cart
5. **Cart Management (15s):** Open cart, adjust quantities
6. **Authentication (10s):** Show user menu, sign out, sign in with Google
7. **Checkout (20s):** Complete purchase, show receipt
8. **Outro (5s):** "Built with React, Redux, Firebase, and Tailwind CSS"

---

## ✨ Current Status

**Backend:** ✅ Running  
**Frontend:** ✅ Running  
**Firebase:** ✅ Configured  
**MongoDB:** ✅ Connected  
**Products:** ✅ Seeded (8 items)  
**Authentication:** ✅ Email/Password + Google enabled

**Ready to test!** Open http://localhost:5173 and try signing up! 🚀
