import React from "react"
import AuthForm from "../AuthForm/AuthForm";

function Login({handleCheckLogin}) {
  return (
    <AuthForm name={'login'} title={'Рады видеть!'}  textButton={'Войти'} handleCheckLogin={handleCheckLogin}/>
  )
};

export default Login;
