// import React, { useState, useEffect } from "react";

// function FormRequest({ onSubmit }) {
//   const [constructors, setConstructors] = useState([]);
//   const [selectedConstructor, setSelectedConstructor] = useState("");
//   const [documentName, setDocumentName] = useState("");

//   useEffect(() => {
//     setConstructors([
//       { id: "1", name: "Конструктор 1" },
//       { id: "2", name: "Конструктор 2" },
//       { id: "3", name: "Конструктор 3" },
//     ]);
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (onSubmit) {
//       onSubmit({
//         constructorId: selectedConstructor,
//         documentName: documentName,
//       });
//     }

//   };

//   return (
//     <form onSubmit={handleSubmit} className="request-form">
//       <div className="form-group">
//         <label htmlFor="constructorSelect">Выберите конструктора:</label>
//         <select
//           id="constructorSelect"
//           value={selectedConstructor}
//           onChange={(e) => setSelectedConstructor(e.target.value)}
//           required
//         >
//           <option value="">Выберите...</option>
//           {constructors.map((constructor) => (
//             <option key={constructor.id} value={constructor.id}>
//               {constructor.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="form-group">
//         <label htmlFor="documentName">Название документа:</label>
//         <input
//           id="documentName"
//           type="text"
//           value={documentName}
//           onChange={(e) => setDocumentName(e.target.value)}
//           required
//         />
//       </div>
//       <button type="submit" className="submit-btn">
//         Отправить запрос
//       </button>
//     </form>
//   );
// }

// export default FormRequest;


import React, { useState, useEffect } from "react";
import {setAddDocs} from '../../utils/MainApi';

function FormRequest({ onSubmit }) {
  const [constructors, setConstructors] = useState([]);
  const [docs, setDocs] = useState([]);
  const [selectedConstructor, setSelectedConstructor] = useState("");
  const [documentName, setDocumentName] = useState("");

  useEffect(() => {
    // Функция для загрузки конструкторов из сервера
    const fetchConstructors = async () => {
      try {
        const response = await fetch('http://localhost:3001/constructors', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }); // Путь к вашему json-server
        if (!response.ok) {
          // Если ответ сервера не OK, выводим ошибку
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Получаем данные в формате JSON
        console.log(data)
        setConstructors(data); // Обновляем состояние списка конструкторов
      } catch (error) {
        console.error("Ошибка при запросе данных:", error);
      }
    };

    fetchConstructors(); // Вызываем функцию fetchConstructors при монтировании компонента
  }, []);


  useEffect(() => {
    // Функция для загрузки конструкторов из сервера
    const fetchDocs = async () => {
      try {
        const response = await fetch('http://localhost:3001/docs', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }); // Путь к вашему json-server
        if (!response.ok) {
          // Если ответ сервера не OK, выводим ошибку
          throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Получаем данные в формате JSON
        console.log(data)
        let nameConstructor = data.map((user) => user.name)
        setDocs(nameConstructor); // Обновляем состояние списка конструкторов
      } catch (error) {
        console.error("Ошибка при запросе данных:", error);
      }
    };

    fetchDocs(); // Вызываем функцию fetchDocs при монтировании компонента

  }, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedConstructor)
    console.log(documentName)
    // if (onSubmit) {
    //   onSubmit({
    //     constructorId: selectedConstructor,
    //     documentName: documentName,
    //   });

    setAddDocs({
      constructorId: selectedConstructor,
      documentName: documentName
    })
    .then(() => {

    })
    .catch((err) => console.log(`Возникла ошибка ${err}`))
    }













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
      <button type="submit" className="submit-btn">
        Отправить запрос
      </button>
    </form>
  );
}

export default FormRequest;