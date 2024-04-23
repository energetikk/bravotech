// import React, { useState, useEffect } from 'react';

// const Table = () => {
//   // Состояние для хранения агрегированных данных по документам
//   const [documentsData, setDocumentsData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       // Здесь должен быть ваш код для получения данных о заявках с сервера
//       const response = await fetch('http://localhost:3001/docs');
//       const requestsData = await response.json();
//       console.log(requestsData)
//       fetchData();
//     },[]),

//   // Вычисляемые данные для таблицы
//   const documentsCount = useMemo(() => {
//     return requests
//       .reduce((accumulator, request) => {
//         if (accumulator[request.title]) {
//           accumulator[request.title] += 1;
//         } else {
//           accumulator[request.title] = 1;
//         }
//         return accumulator;
//       }, {})
//       .map((count, title) => ({ title, count })) // Преобразуем в массив объектов
//       .sort((a, b) => b.count - a.count); // Сортируем по убыванию количества заявок
//   }, []);

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Наименование документа</th>
//           <th>Количество заявок</th>
//         </tr>
//       </thead>
//       <tbody>
//         {documentsCount.map((document) => (
//           <tr key={document.title}>
//             <td>{document.title}</td>
//             <td>{document.count}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

import React, { useMemo, useEffect, useState } from "react";

const Table = () => {
  const [requests, setRequest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Здесь должен быть ваш код для получения данных о заявках с сервера
      const response = await fetch("http://localhost:3001/docs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      const requestsData = await response.json();
      console.log(requestsData);
      setRequest(requestsData);
    };

    fetchData();
  }, []);
  console.log(requests);
  // Вычисляемые данные для таблицы
  const documentsCount = useMemo(() => {
    // Считаем количество заявок на каждый документ
    const counts = requests.reduce((accumulator, request) => {
      accumulator[request.title] = (accumulator[request.title] || 0) + 1;
      return accumulator;
    }, {});
    // Преобразуем объект с количеством в массив и сортируем
    return Object.entries(counts)
      .map(([title, count]) => ({ title, count })) // Преобразуем объект в массив объектов
      .sort((a, b) => b.count - a.count); // Сортируем по убыванию количества заявок
  }, [requests]);

  return (
    <table>
      <thead>
        <tr>
          <th>Наименование документа</th>
          <th>Количество заявок</th>
        </tr>
      </thead>
      <tbody>
        {documentsCount.map((document) => (
          <tr key={document.title}>
            <td>{document.title}</td>
            <td>{document.count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
