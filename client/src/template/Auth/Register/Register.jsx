import React from 'react';
import {Link} from "react-router-dom";
import {REGISTER_URL} from '../../../data/api'

const register = async (e) => {
  e.preventDefault();
  try {
    // eslint-disable-next-line no-undef
    const res = await fetch(REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
        role: e.target.role.value,
      }),
    });
    alert((await res.json()).message);
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}

const Register = () => {
  return (
    <div>
     <h1>Register</h1>
    <form onSubmit={register}>
      <input type="email" name="email" placeholder="email" required/>
      <br/>
      <br/>
      <input type="password" name="password" placeholder="password" required/>
      <br/>
      <br/>
      <select name="role" id="role">
        <option value="SHIPPER">SHIPPER</option>
        <option value="DRIVER">DRIVER</option>
      </select>
      <br/>
      <br/>
      <input type="submit"/>
    </form>

      <div>
        <Link to={"/login"}>Do you have account? Log in Right now</Link>
      </div>
  </div>
  )
}

export default Register;
