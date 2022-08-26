import React, {useState} from "react";
import {USERS_URL, REGISTERED_HEADERS, CHANGE_PASSWORD_URL} from "../../data/api";




function User() {
  const [usersInfo, setUsersInfo] = useState('');

  const getProfile = async () => {
    const res = await fetch(USERS_URL, {
      headers: REGISTERED_HEADERS,
    })
    setUsersInfo(JSON.stringify(await res.json()));
  }

  const changePassword = async (e) => {
    e.preventDefault()
    const res = await fetch(CHANGE_PASSWORD_URL, {
      headers: REGISTERED_HEADERS,
      method: 'PATCH',
      body: JSON.stringify({
        oldPassword: e.target.oldPassword.value,
        newPassword: e.target.newPassword.value
      })
    })

    if (res.status === 200) {
      alert("Success")
    } else {
      alert(JSON.stringify((await res.json()).message))
    }
  }

  const deleteProfile = async () => {
    const res = await fetch(USERS_URL, {
      headers: REGISTERED_HEADERS,
      method: 'DELETE'
    })

    if (res.status === 200) {
      document.cookie = `jwt_token=`;
      alert("Success");
    } else {
      alert(JSON.stringify(await res.json))
    }
  }


  return (
    <div>
      <button onClick={getProfile}>Get profile</button>
      <div>
        {usersInfo}
      </div>
      <br/>
      <br/>
      <div>
        <h2>Change password</h2>
        <form onSubmit={changePassword}>
          <input type="password" name={'oldPassword'} placeholder={'old'}/>
          <input type="password" name={'newPassword'} placeholder={'new'}/>
          <input type="submit"/>
        </form>
      </div>
      <br/>
      <br/>
      <div>
        <button onClick={deleteProfile}>Delete Profile</button>
      </div>
    </div>
  )
}

export default User;
