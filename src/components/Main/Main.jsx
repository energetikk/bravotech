import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import FormRequest from '../FormRequest/FormRequest';
import Table from '../Table/Table';


function Main() {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <main>
      <section className="profile">
        <h2 className="profile__name">Добро пожаловать, {currentUser.name}!</h2>
        <h3 className="profile__email">{currentUser.email}</h3>
      </section>
      <article>

      <FormRequest />
      {/* <Table /> */}
      </article>
    </main>
  );
}

export default Main;
