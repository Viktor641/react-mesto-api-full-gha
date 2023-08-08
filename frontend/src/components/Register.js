import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">{props.title}</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          onChange={handlePasswordChange}
          value={password}
          required
        />
        <button className="login__button" type="submit">{props.textSubmit}</button>
      </form>
      <p className="login__paragraph">{props.paragraph}
        <Link to="/sign-in" className="login__link"> Войти</Link>
      </p>
    </section>
  )
}

export default Register