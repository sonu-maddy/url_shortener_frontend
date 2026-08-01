

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (token && username) {
      setUser({
        username,
        token
      });
    }

  }, []);

  const login = (data) => {

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);

    setUser({
      username: data.username,
      token: data.token
    });

  };

  const logout = () => {

    localStorage.clear();

    setUser(null);

  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => useContext(AuthContext);