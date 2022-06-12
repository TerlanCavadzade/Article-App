import { useState } from "react";
import React from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  isAdmin: false,
  isReviewer: false,
  login: (token,admin,reviewer) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialAdmin = localStorage.getItem("tdthn");
  const initialReviewer = localStorage.getItem("reviewer");

  const [token, setToken] = useState(initialToken);
  const [admin, setAdmin] = useState(initialAdmin);
  const [reviewer, setReviewer] = useState(initialReviewer);

  const userIsLoggedIn = !!token;
  const userIsAdmin = !!admin;
  const userIsReviewer = !!reviewer;

  const loginHandler = (token, admin, reviewer) => {
    setToken(token);
    setAdmin(admin);
    setReviewer(reviewer);

    localStorage.setItem("token", token);
    if (admin) {
      localStorage.setItem("tdthn", admin);
    }
    if (reviewer) {
      localStorage.setItem("reviewer", reviewer);
    }
  };

  var logoutHandler = () => {
    setToken(null);
    setAdmin(null);
    setReviewer(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tdthn");
    localStorage.removeItem("reviewer");
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    isAdmin: userIsAdmin,
    isReviewer: userIsReviewer,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
