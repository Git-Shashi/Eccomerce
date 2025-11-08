import { auth } from '../firebase/config';

/**
 * Get headers with user authentication
 * Includes userId in x-user-id header for backend authentication
 */
export const getAuthHeaders = () => {
  const user = auth.currentUser;
  
  const headers = {
    'Content-Type': 'application/json'
  };
  
  if (user) {
    // Send Firebase user ID to backend
    headers['x-user-id'] = user.uid;
  } else {
    // Guest user for unauthenticated sessions
    // You can use localStorage to persist guest cart
    const guestId = localStorage.getItem('guestUserId') || `guest-${Date.now()}`;
    localStorage.setItem('guestUserId', guestId);
    headers['x-user-id'] = guestId;
  }
  
  return headers;
};

/**
 * Get current user ID (Firebase UID or guest ID)
 */
export const getCurrentUserId = () => {
  const user = auth.currentUser;
  
  if (user) {
    return user.uid;
  }
  
  // Return guest ID for unauthenticated users
  const guestId = localStorage.getItem('guestUserId') || `guest-${Date.now()}`;
  localStorage.setItem('guestUserId', guestId);
  return guestId;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!auth.currentUser;
};
