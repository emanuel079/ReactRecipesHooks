import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    navigate('/');
  };

  const logout = () => {
    setUser(null);
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
