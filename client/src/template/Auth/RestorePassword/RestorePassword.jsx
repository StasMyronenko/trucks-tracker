import React from "react";
import { useParams} from "react-router-dom";
import {RESTORE_PASSWORD_URL} from "../../../data/api";


const RestorePassword = () => {
  const {email} = useParams()

  const restorePassword = async (e) => {
    e.preventDefault();
    const res = await fetch(RESTORE_PASSWORD_URL + email, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newPassword: e.target.newPassword.value
      })
    })
    const info = await res.json();
    alert(info.message)
  }

  return (
    <div>
      <h2>Restore Password</h2>
      <form onSubmit={restorePassword}>
        <input type="password" placeholder={'Password'} name={'newPassword'} id={'newPassword'}/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default RestorePassword
