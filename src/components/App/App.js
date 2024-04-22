import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  Link,
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
  const [emailUser, setEmailUser] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [isStatusLoginError, setIsStatusLoginError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { search } = location;
  const [errorPage, setErrorPage] = useState(false);

  const handleCheckRegister = (name, password, email) => {
    MainApi.register({ name, password, email })
      .then((data) => {
        handleCheckLogin(password, email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(`ошибка регистрации ${err}`);
      });
  };

  const handleCheckLogin = (password, email) => {
    MainApi.authorize({ password, email })
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("jwt", data.accessToken);
          localStorage.setItem("user", JSON.stringify(data.user));
          // Хранение чувствительных данных в localStorage может быть потенциально небезопасным,
          // так как они доступны через JavaScript и могут быть скомпрометированы при XSS атаках.
          // Всегда стоит проверять JWT на сервере для подтверждения аутентификации.
          // Но в данном случае json-server не позволяет без дополнительных телодвижений реализовать данный функционал.
          localStorage.setItem("loggedIn", "true");
          // Устанавливаем состояние
          setLoggedIn(true);
          setCurrentUser(data.user);
          setNameUser(data.user.name);
          setEmailUser(data.user.email);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации: ${err}`);
      });
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
    setLoggedIn(JSON.parse(localStorage.getItem("loggedIn")));
  }, [loggedIn]);

  const handleLogout = () => {
    // Очищаем данные в localStorage
    localStorage.removeItem("jwt");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    // Сбрасываем состояния
    setLoggedIn(false);
    setCurrentUser({});
    setEmailUser("");
    setNameUser("");
    // Перенаправление на страницу входа
    navigate("/signin", { replace: true });
  };

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

          <Route
            path={"*"}
            element={<PageNotFound setErrorPage={setErrorPage} />}
          />
          <Route
            path="/"
            element={<ProtectedRoute element={Main} loggedIn={loggedIn} />}
          />

          <Route
            path="/"
            element={loggedIn ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </CurrentUserContext.Provider>
      <Link className="btn" to="/">
        Главная
      </Link>
      <Link className="btn" to="/signup">
        Регистрация
      </Link>
      <Link className="btn" to="/signin">
        Войти
      </Link>
      <button type="button" onClick={handleLogout}>
        {" "}
        Выйти из аккаунта
      </button>
    </div>
  );
}

export default App;
