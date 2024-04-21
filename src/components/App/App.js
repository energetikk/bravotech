import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import * as MainApi from "../../utils/MainApi";
import Main from "../Main/Main";

import "./App.css";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPage, setErrorPage] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [isStatusLoginError, setIsStatusLoginError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { search } = location;

  ////////////////////////////////

  function handleCheckStatusLoginError() {
    setIsStatusLoginError(true);
  }

  // const tokenCheck = () => {
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     MainApi.getContent(jwt)
  //       .then((user) => {
  //         handleLogin(user);
  //         navigate(`${pathname}${search}`, { replace: true });
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  const handleLogin = (user) => {
    setLoggedIn(true);
    setEmailUser(user.email);
    setNameUser(user.name);
    console.log(user.email);
    console.log(user.name);
  };

  function handleCheckRegister(name, password, email) {
    MainApi.register({ name, password, email })
      .then((res) => {
        handleCheckLogin(password, email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        handleCheckStatusLoginError(err);
        console.log(`ошибка ${err}`);
      });
  }

  function handleCheckLogin(password, email) {
    MainApi.authorize({ password, email })
      .then((res) => {
        if (res.accessToken) {
          console.log(res);
          localStorage.setItem("jwt", res.accessToken);
          localStorage.setItem("user", JSON.stringify(res.user));
          setLoggedIn(true);
          handleLogin({ password, email });
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        handleCheckStatusLoginError();
        console.log(`ошибка ${err}`);
      });
  }
  ///////////////////////////////

  // function singOut() {
  //   localStorage.removeItem("jwt");
  //   setLoggedIn(false);
  //   navigate("/signin");
  // }

  // useEffect(() => {
  //   tokenCheck();
  // }, [loggedIn]);

  // useEffect(() => {
  // }, [])

  // useEffect(() => {
  //   if (loggedIn) {
  //     MainApi.getUserInfo()
  //       .then((user) => {
  //         setCurrentUser(user);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('user')))
  }, [])

  console.log(loggedIn);

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
                <Login handleCheckLogin={handleCheckLogin} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register handleCheckRegister={handleCheckRegister} />
              )
            }
          />

          {/* <Route
            path={"*"}
            element={<PageNotFound setErrorPage={setErrorPage} />}
          /> */}
          <Route
            path="/"
            element={<ProtectedRoute element={Main} loggedIn={loggedIn} />}
          />

          {/* <Route
            path="/"
            element={
              // loggedIn ? (
                // <Navigate to="/" />
              // ) : (
                <Main />
                // <Login />

             } */}
          {/* /> */}
        </Routes>
      </CurrentUserContext.Provider>
      <h2>Просто текст на главной</h2>
    </div>
  );
}

export default App;
