import React, {useState} from "react";
import {TRUCKS_URL, REGISTERED_HEADERS} from "../../data/api";


function Truck() {
  const [usersTrucks, setUsersTrucks] = useState(null);
  const [usersTruckById, setUsersTruckById] = useState(null);

  const getUsersTrucks = async () => {
    const res = await fetch(TRUCKS_URL, {
      headers: REGISTERED_HEADERS
    })
    setUsersTrucks(JSON.stringify(await res.json()))
  }

  const getTruckById = async (e) => {
    e.preventDefault();
    const res = await fetch(TRUCKS_URL + e.target.truckId.value, {
      headers: REGISTERED_HEADERS
    })
    setUsersTruckById(JSON.stringify(await res.json()))
  }

  const addTruck = async (e) => {
    e.preventDefault();
    const res = await fetch(TRUCKS_URL, {
      method: 'POST',
      headers: REGISTERED_HEADERS,
      body: JSON.stringify({
        type: e.target.type.value,
      })
    })
    alert(JSON.stringify(await res.json()))
  }

  const updateTruckById = async (e) => {
    e.preventDefault();
    const res = await fetch(TRUCKS_URL + e.target.truckIdForUpdate.value, {
      method: 'PUT',
      headers: REGISTERED_HEADERS,
      body: JSON.stringify({
        type: e.target.typeForUpdate.value
      })
    })
    const info = await res.json();
    alert(info.message)
  }

  const deleteTruckById = async (e) => {
    e.preventDefault()
    const res = await fetch(TRUCKS_URL + e.target.truckIdForDelete.value, {
      method: 'DELETE',
      headers: REGISTERED_HEADERS,
    })

    const info = await res.json();
    alert(info.message);
  }

  const assignTruckById = async (e) => {
    e.preventDefault();
    const res = await fetch(TRUCKS_URL + e.target.truckIdForAssign.value + '/assign', {
      method: 'POST',
      headers: REGISTERED_HEADERS,
    })

    const info = await res.json();
    alert(info.message)
  }
  return (
    <div>
      <div>
        <button onClick={getUsersTrucks}>Get user's Trucks</button>
        <div id={'usersTrucks'}>
          {usersTrucks}
        </div>
        <div>
          <h2>Add truck</h2>
          <form onSubmit={addTruck}>
            <select name="type" id="type">
              <option value="SPRINTER">SPRINTER</option>
              <option value="SMALL STRAIGHT">SMALL STRAIGHT</option>
              <option value="LARGE STRAIGHT">LARGE STRAIGHT</option>
            </select>
            <input type="submit"/>
          </form>
        </div>
        <div>
          <h2>Get truck by id</h2>
          <form onSubmit={getTruckById}>
            <input type="text" name={'truckId'} id={'truckId'} placeholder={'Trucks ID'}/>
            <input type="submit"/>
          </form>
          <div>{usersTruckById}</div>
        </div>
        <div>
          <h2>Update Truck By ID</h2>
          <form onSubmit={updateTruckById}>
            <input type="text" name={'truckIdForUpdate'} id={'truckIdForUpdate'} placeholder={'Trucks ID'}/>
            <select name="typeForUpdate" id="typeForUpdate">
              <option value="SPRINTER">SPRINTER</option>
              <option value="SMALL STRAIGHT">SMALL STRAIGHT</option>
              <option value="LARGE STRAIGHT">LARGE STRAIGHT</option>
            </select>
            <input type="submit"/>
          </form>
        </div>
        <div>
          <h2>Delete Truck for id</h2>
          <form onSubmit={deleteTruckById}>
            <input type="text" name={'truckIdForDelete'} id={'truckIdForDelete'} placeholder={'Trucks ID'}/>
            <input type="submit"/>
          </form>
        </div>
        <div>
          <h2>Assign truck to user by id</h2>
          <div>
            <form onSubmit={assignTruckById}>
              <input type="text" name={'truckIdForAssign'} id={'truckIdForAssign'} placeholder={'Trucks ID'}/>
              <input type="submit"/>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Truck;
