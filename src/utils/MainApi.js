export const BASE_URL = "http://localhost:3001/";

//Проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Произошла ошибка: ${res.status}`);
}

export const register = ({ name, password, email }) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, password, email }),
  }).then((res) => checkResponse(res));
};

export const authorize = ({ password, email }) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ password, email }),
  }).then((res) => checkResponse(res));
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkResponse(res));
};

//Запросить информацию о пользователе с сервера
export const getUserInfo = () => {
  return fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  }).then((res) => checkResponse(res));
};

//Записать обновленную информацию о пользователе на сервер
export const setUserInfo = ({ name, email }) => {
  return fetch(`${BASE_URL}users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    credentials: "include",
    body: JSON.stringify({
      name,
      email,
    }),
  }).then((res) => checkResponse(res));
};
