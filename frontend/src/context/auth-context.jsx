import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authLogin, authGetUserData } from "../auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const NAVIGATE = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedOut, setLoggedOut] = useState(false);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setLoggedOut(true);
  }

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      authGetUserData(token, refreshToken).then(userData => {
        setUser(userData);
      }).catch(error => {
        console.error('Failed to fetch user data:', error);
        localStorage.clear();
        NAVIGATE("/login", { replace: true });
      });
    }
  }, []);

  const login = async (formData) => {
    try {
      const userData = await authLogin(formData);
      const { user, token, refreshToken } = userData;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      return userData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
