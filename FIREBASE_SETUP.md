# Firebase Authentication Setup

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name (e.g., "ecom-store")
4. Follow the setup wizard

## Step 2: Enable Authentication Methods

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password**
3. Enable **Google** sign-in provider
4. Add your domain to authorized domains if deploying

## Step 3: Get Your Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click **Web** icon (</>) to create a web app
4. Register your app (name: "Ecom Store")
5. Copy the `firebaseConfig` object

## Step 4: Update Your App

Open `frontend/src/firebase/config.js` and replace the config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Features Implemented

✅ **Email/Password Authentication**
- Sign up with email and password
- Sign in with existing account
- Form validation

✅ **Google Sign-In**
- One-click Google authentication
- Automatic account creation

✅ **User Profile**
- User icon in navbar
- Display name and email
- Sign out functionality

✅ **Protected Features**
- Show user menu when logged in
- Sign in button when logged out
- User avatar display

## Usage

1. Click "Sign In" button in navbar
2. Choose authentication method:
   - Enter email/password and click "Sign Up" (new users)
   - Enter email/password and click "Sign In" (existing users)
   - Click "Sign in with Google" for Google authentication
3. Once authenticated, user icon appears in navbar
4. Click user icon to see profile menu and sign out option

## Security Notes

- Never commit `firebase/config.js` with real credentials to public repositories
- Use environment variables for production:
  ```javascript
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  ```
- Add your production domain to Firebase authorized domains
