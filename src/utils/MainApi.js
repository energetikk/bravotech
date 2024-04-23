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

//Записать добавление документа на сервер
export const setAddDocs =(data) => {
  return fetch(`${BASE_URL}docs`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
   },
    credentials: 'include',
    body: JSON.stringify({
      title: data.documentName,
      userId: data.constructorId
    })})
.then((res) => checkResponse(res));
}
