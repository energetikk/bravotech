import React from "react";
import { Link } from "react-router-dom";
import "./authForm.css";
import useInput from "../../hooks/useForm";


function AuthForm({
  name,
  title,
  textButton,
  handleCheckRegister,
  handleCheckLogin,
}) {

  const nameuser = useInput("", {isEmpty: true, minLength: 2, maxLength: 40 });
  const email = useInput("", { isEmpty: true, emailRegEx: true});
  const password = useInput("", { isEmpty: true, minLength: 6, maxLength: 12 });


  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (name === "register") {
      handleCheckRegister(
        nameuser.formValue,
        password.formValue,
        email.formValue
      );
    } else {
      handleCheckLogin(password.formValue, email.formValue);
    }
  };

  return (
    <header className="auth__container">
      <form
        name={`${name}-form`}
        className="form__auth"
        onSubmit={handleSubmit}
        noValidate
      >
        <Link to="/" className="logo-auth"></Link>
        <h2 className="form__title-auth">{title}</h2>
        {name === "register" && (
          <div className="input-block">
            <div className="nameinput-nameuser">Имя</div>
            <input
              id="input-nameuser"
              required
              minLength="2"
              maxLength="40"
              type="text"
              placeholder="Имя"
              name="nameuser"
              className="form__item-auth form__item_el_nameuser"
              onChange={(evt) => nameuser.handleChangeInput(evt)}
              value={nameuser.formValue || ""}
              onBlur={(evt) => nameuser.onBlur(evt)}
            />
            <span className="input-errors">
            {nameuser.isDirty && nameuser.minLengthError && (
            <span id="input-nameuser-error" className="popup__error">
              Не может быть меньше 2 символов
            </span>
          )}

          {nameuser.isDirty && nameuser.isEmpty && (
            <span id="input-nameuser-error" className="popup__error">
              Заполните поле!!!
            </span>
          )}
          </span>
          </div>
        )}

        <div className="input-block">
          <div className="nameinput-nameuser">Email</div>
          <input
            id="input-email"
            required
            minLength="2"
            maxLength="40"
            type="email"
            placeholder="E-mail"
            name="email"
            className="form__item-auth form__item_el_email"
            onChange={(evt) => email.handleChangeInput(evt)}
            value={email.formValue || ""}
            onBlur={(evt) => email.onBlur(evt)}
          />
          <span className="input-errors">
          {email.isDirty && email.emailError && (
            <span id="input-email-error" className="popup__error">
              Не правильный Email!
            </span>
          )}
          {email.isDirty && email.isEmpty && (
            <span id="input-email-error" className="popup__error">
              Заполните поле!
            </span>
          )}
          </span>
        </div>

        <div className="input-block">
          <div className="nameinput-nameuser">Пароль</div>
          <input
            id="input-password"
            required
            minLength="2"
            maxLength="200"
            type="password"
            placeholder="Пароль"
            name="password"
            className="form__item-auth form__item_el_password"
            onChange={(evt) => password.handleChangeInput(evt)}
            value={password.formValue || ""}
            onBlur={(evt) => password.onBlur(evt)}
          />
          <span className="input-errors">
          {(password.isDirty && password.minLengthError || password.maxLengthError) && (
            <span id="input-password-error" className="popup__error">
              Пароль должен быть от 6 до 12 символов!
            </span>
          )}
          {password.isDirty && password.isEmpty && (
            <span id="input-password-error" className="popup__error">
              Заполните поле!
            </span>
          )}
          </span>
        </div>
        {name === "register" ? (<button
          disabled={!nameuser.inputValid || !email.inputValid || !password.inputValid}
          type="submit"
          className={`${(!nameuser.inputValid || !email.inputValid || !password.inputValid) && 'auth__submit_disable'} auth__submit`}>{textButton}</button>) :
          (<button
            disabled={!email.inputValid || !password.inputValid}
            type="submit"
            className={`${(!email.inputValid || !password.inputValid) && 'auth__submit_disable'} auth__submit`}>{textButton}</button>)}
      </form>

      {name === "register" ? (
        <div className="link-auth">
          <p className="question-auth">Уже зарегистрированы?</p>
          <Link to="/signin" className="button__signin">
            Войти
          </Link>
        </div>
      ) : (
        <div className="link-auth">
          <p className="question-auth">Еще не зарегестрированы?</p>
          <Link to="/signup" className="button__signin">
            Регистрация
          </Link>
        </div>
      )}
    </header>
  );
}

export default AuthForm;
