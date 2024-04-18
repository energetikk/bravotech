import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { pathname } = location;
  // const { search } = location;

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                // <Login handleCheckLogin={handleCheckLogin} />
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                // <Register handleCheckRegister={handleCheckRegister} />
                <Register />
              )
            }
          />

          {/* <Route
            path={"*"}
            element={<PageNotFound setErrorPage={setErrorPage} />}
          /> */}
        </Routes>
      </CurrentUserContext.Provider>
      <h2>Просто текст на главной</h2>
    </div>
  );
}

export default App;
