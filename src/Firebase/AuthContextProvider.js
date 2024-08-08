import React, { createContext, useState, useEffect, useContext } from 'react';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from '@firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyAF1ANz6viZlvi4iL7MC8K2XgddQptRrhE",
    authDomain: "expenseflow-f003c.firebaseapp.com",
    projectId: "expenseflow-f003c",
    storageBucket: "expenseflow-f003c.appspot.com",
    messagingSenderId: "350235583247",
    appId: "1:350235583247:web:d827debb067f4159ac147a",
    measurementId: "G-MQF15639TM"
};


const app = initializeApp(firebaseConfig);
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Track user authentication state

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleAuthentication = async (email, password, isLogin) => {
    try {
      if (!isLogin) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, handleAuthentication, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
