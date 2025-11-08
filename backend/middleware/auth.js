import { UnauthorizedError } from './errorHandler.js';

/**
 * Middleware to extract userId from request
 * For Firebase authentication, this would verify the Firebase token
 * For now, we'll accept userId from header or use a session-based approach
 */
export const authenticateUser = (req, res, next) => {
  // Option 1: Get userId from header (for Firebase authenticated users)
  const userId = req.headers['x-user-id'] || req.headers['authorization']?.split(' ')[1];
  
  // Option 2: For development/testing, use a default user if not provided
  // In production, you should always require authentication
  if (!userId) {
    // For demo purposes, we'll use a guest user ID
    // In production, this should throw an UnauthorizedError
    req.userId = 'guest-user';
  } else {
    req.userId = userId;
  }
  
  next();
};

/**
 * Strict authentication middleware that requires a valid user
 * Use this for protected routes
 */
export const requireAuth = (req, res, next) => {
  const userId = req.headers['x-user-id'] || req.headers['authorization']?.split(' ')[1];
  
  if (!userId) {
    throw new UnauthorizedError('Authentication required. Please provide a valid user ID.');
  }
  
  req.userId = userId;
  next();
};

/**
 * Middleware to verify Firebase ID token
 * This is for production use with Firebase Authentication
 */
export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      throw new UnauthorizedError('No token provided');
    }
    
    // In production, verify the token with Firebase Admin SDK:
    // const decodedToken = await admin.auth().verifyIdToken(token);
    // req.userId = decodedToken.uid;
    // req.user = decodedToken;
    
    // For now, we'll extract userId from the token (mock)
    req.userId = token; // In production, use decodedToken.uid
    
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};
