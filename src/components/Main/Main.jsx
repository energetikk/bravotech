import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Main({handleLogout}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <h2 className="profile__name">Добро пожаловать, {currentUser.name}!</h2>
        <h3 className="profile__email">{currentUser.email}</h3>
      </section>
      <p>
        Выберите один из вариантов ниже: "Сформировать заявку" или "Выгрузить
        отчет в таблицу"
      </p>
      <Link className="btn" to="/form">
        Форма заявки
      </Link>
      <Link className="btn" to="/table">
        Таблица
      </Link>

    </main>
  );
}

export default Main;
