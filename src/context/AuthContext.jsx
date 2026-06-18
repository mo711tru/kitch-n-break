import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialAuth } from '../firebase/config'; 
// Simulierter oder echter Firebase-Auth-Brückenkopf
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(initialAuth, email, password);
  }

  function logout() {
    return signOut(initialAuth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(initialAuth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}