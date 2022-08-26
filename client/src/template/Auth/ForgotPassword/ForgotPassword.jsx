import React from 'react';
import {FORGOT_PASSWORD_URL} from "../../../data/api";

const sendRestorePassword = async (e) => {
  e.preventDefault();
  const res = await fetch(FORGOT_PASSWORD_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email: e.target.email.value
    })
  });
  const info = await res.json();
  alert(info.message);
}

const ForgotPassword = () => {
  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={sendRestorePassword}>
        <input type="text" placeholder={'email'} name={'email'} id={'email'}/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default ForgotPassword
