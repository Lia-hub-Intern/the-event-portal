import React, { createContext, useContext, useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberMeFlag = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMeFlag);

    // Läs token från rätt lagringsutrymme baserat på "Remember Me"
    const token = rememberMeFlag ? localStorage.getItem('token') : sessionStorage.getItem('token');
    const sharedAccountId = rememberMeFlag ? localStorage.getItem('sharedAccountId') : sessionStorage.getItem('sharedAccountId');
    const userId = rememberMeFlag ? localStorage.getItem('userId') : sessionStorage.getItem('userId');

    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp < currentTime) {
          console.warn('Token expired. Logging out...');
          logout();
          return;
        }

        setUser({ ...decoded, userId });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token. Logging out...');
        logout();
      }
    }
  }, []);  // Detta körs när komponenten laddas om

  const login = async (username, password, rememberMeFlag) => {
    try {
      const response = await fetch('http://localhost:7000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        const token = data.token;
        const sharedAccountId = data.sharedAccountId;
        const userId = data.userId;  // Assuming the backend sends userId

        // Spara token och userId i rätt lagringsutrymme baserat på rememberMe
        if (rememberMeFlag) {
          localStorage.setItem('token', token);
          localStorage.setItem('sharedAccountId', sharedAccountId);
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('userId', userId); // Save userId in localStorage
        } else {
          sessionStorage.setItem('token', token);  // Endast för sessionen
          sessionStorage.setItem('sharedAccountId', sharedAccountId);
          sessionStorage.setItem('rememberMe', 'false');
          sessionStorage.setItem('userId', userId); // Save userId in sessionStorage
        }

        setRememberMe(rememberMeFlag);

        // Dekoda token och uppdatera tillstånd
        const decoded = jwt_decode(token);
        console.log('Decoded token after login:', decoded);
        setUser({ ...decoded, userId });  // Set user along with userId
        setIsAuthenticated(true);
        setMessage('Login successful');

        return true;
      } else {
        setMessage(data.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login error: ' + error.message);
      return false;
    }
  };

  const logout = () => {
    console.log("Logging out...");
    // Ta bort token från rätt lagringsutrymme baserat på rememberMe
    if (rememberMe) {
      localStorage.removeItem('token');
      localStorage.removeItem('sharedAccountId');
      localStorage.removeItem('rememberMe');
      localStorage.removeItem('userId');  // Remove userId from localStorage
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('sharedAccountId');
      sessionStorage.removeItem('rememberMe');
      sessionStorage.removeItem('userId');  // Remove userId from sessionStorage
    }

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        message,
        rememberMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);