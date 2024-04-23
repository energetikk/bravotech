import React, { useState, useEffect } from "react";
import { setAddDocs } from "../../utils/MainApi";
import "./FormRequest.css";

function FormRequest() {
  const [constructors, setConstructors] = useState([]);
  const [docs, setDocs] = useState([]);
  const [errorUser, setErrorUser] = useState(false);
  const [errorDublicate, setErrorDublicate] = useState(false);
  const [selectedConstructor, setSelectedConstructor] = useState("");
  const [documentName, setDocumentName] = useState("");
  useEffect(() => {
    // Функция для загрузки конструкторов из сервера
    const fetchConstructors = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        if (!response.ok) {
          // Если ответ сервера не OK, выводим ошибку
          throw new Error("Ответ от сервера вернулся с ошибкой");
        }
        const data = await response.json(); // Получаем данные в формате JSON
        setConstructors(data); // Обновляем состояние списка конструкторов
      } catch (error) {
        console.error("Ошибка при запросе данных:", error);
      }
    };

    fetchConstructors();
  }, []);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await fetch("http://localhost:3001/docs", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        });
        if (!response.ok) {
          // Если ответ сервера не OK, выводим ошибку
          throw new Error("Запрос ошибочный");
        }
        const data = await response.json(); // Получаем данные в формате JSON
        setDocs(data); // Обновляем состояние списка конструкторов
      } catch (error) {
        console.error("Ошибка при запросе данных:", error);
      }
    };
    fetchDocs();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Проверяем, существует ли уже документ с таким названием
    const existingDoc = docs.find((doc) => doc.title === documentName);
    if (existingDoc) {
      setErrorDublicate(true); // Включаем индикатор ошибки
      return; // Прерываем отправку формы
    }
    setErrorDublicate(false); // Выключаем индикатор ошибки, если все в порядке

    //код для отправки данных
    setAddDocs({
      constructorId: selectedConstructor,
      documentName: documentName,
    })
      .then(() => {
        // Очищаем поля формы после успешной отправки
        setSelectedConstructor("");
        setDocumentName("");
        setErrorUser(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}. Выберите свою фамилию из списка`);
        setErrorUser(true);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="request-form">
      <div className="form-group">
        <label htmlFor="constructorSelect">Выберите конструктора:</label>
        <select
          id="constructorSelect"
          value={selectedConstructor}
          onChange={(e) => setSelectedConstructor(e.target.value)}
          required
        >
          <option value="">Выберите...</option>
          {constructors.map((constructor) => (
            <option key={constructor.id} value={constructor.id}>
              {constructor.name}
            </option>
          ))}
        </select>
      </div>
      <span className={`form__error ${errorUser ? "form__error_active" : ""}`}>
        Вы должны выбрать текущего пользователя из списка
      </span>
      <div className="form-group">
        <label htmlFor="documentName">Название документа:</label>
        <input
          id="documentName"
          type="text"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          required
        />
      </div>
      <span
        className={`form__error ${errorDublicate ? "form__error_active" : ""}`}
      >
        Документ с таким названием уже существует!
      </span>
      <button type="submit" className="submit-btn">
        Отправить запрос
      </button>
    </form>
  );
}

export default FormRequest;
