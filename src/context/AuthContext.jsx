import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Create the Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 1. Register Function
   * Creates a new user in Firebase Authentication
   */
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  /**
   * 2. Login Function
   * Authenticates an existing user
   */
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  /**
   * 3. Logout Function
   * Ends the current Firebase session
   */
  const logout = () => {
    return signOut(auth);
  };

  /**
   * 4. Persistence Effect
   * This is the "secret sauce" that keeps the user logged in on refresh.
   * Firebase stores the session in IndexedDB automatically; this listener
   * retrieves it when the app loads.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once Firebase confirms the auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {/* Wait for loading to be false before rendering the app 
        to prevent flickering between "Login" and "Profile" buttons. 
      */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to Auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
