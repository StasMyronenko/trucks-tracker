import React from 'react';
import {Link} from "react-router-dom";

const {LOGIN_URL} = require('../../../data/api')

const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: e.target.email.value, password: e.target.password.value,
        }),
      });
      if (res.status === 200) {
        const token = (await res.json()).jwt_token;
        document.cookie = `jwt_token=${token}`;
        alert('Success');
        // window.location.replace('http://127.0.0.1:3000');
      }
    } catch (err) {
      alert(err.message);
    }
  }

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
    <form onSubmit={login}>
      <input type="email" placeholder="Email" name={"email"} />
      <br/>
      <br/>
      <input type="password" name={"password"} placeholder={"Password"}/>
      <br/>
      <br/>
      <input type="submit"/>
      <br/>
      <br/>

    </form>
      <div>
        <Link to={"/register"}>Do you want to register? Do it Right now</Link>
      </div>
      <br/>
      <div>
        <Link to={"/forgot_password"}>Forgot password</Link>
      </div>
  </div>
  )
}

export default Login;
