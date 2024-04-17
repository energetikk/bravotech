import "./App.css";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const { pathname } = location;
  // const { search } = location;

  return (
    <div className="App">
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

          <Route
            path="*"
            // element={<PageNotFound setErrorPage={setErrorPage} />}
            element={<PageNotFound />}
          />
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
