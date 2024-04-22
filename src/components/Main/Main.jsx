import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import FormRequest from '../FormRequest/FormRequest';



function Main() {
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);
  return (
    <main>
      <section className="profile">
        <h3 className="profile__name">{currentUser.name}</h3>
        <h3 className="profile__email">{currentUser.email}</h3>
      </section>
      <article>

      <FormRequest />

      </article>
    </main>
  );
}

export default Main;
