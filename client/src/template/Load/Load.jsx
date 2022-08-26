import React, {useState} from "react";
import {LOADS_URL, REGISTERED_HEADERS} from "../../data/api";

function Load() {
  const [usersLoads, setUsersLoads] = useState(null)
  const [activeLoad, setActiveLoad] = useState(null)
  const [loadById, setLoadById] = useState(null)
  const [shippingInfo, setShippingInfo] = useState(null)

  const getUsersLoads = async (e) => {
    e.preventDefault();
    const status = (e.target.status.value !== 'ANY') ? e.target.status.value : undefined;
    const limit = e.target.limit.value || undefined
    const offset = e.target.offset.value || undefined
    let link = LOADS_URL + '?'
    if (status) {
      link += `status=${status}&`;
    }
    if (limit) {
      link += `limit=${limit}&`;
    }
    if (offset) {
      link += `offset=${offset}`;
    }
    console.log(link)
    const res = await fetch(link, {
      headers: REGISTERED_HEADERS
    })

    const info = await res.json();
    setUsersLoads(JSON.stringify(info));
  }

  const createLoad = async (e) => {
    e.preventDefault();
    const res = await fetch(LOADS_URL, {
      method: 'POST',
      headers: REGISTERED_HEADERS,
      body: JSON.stringify({
        name: e.target.name.value,
        payload: e.target.payload.value,
        pickup_address: e.target.pickup_address.value,
        delivery_address: e.target.delivery_address.value,
        dimensions: {
          width: e.target.width.value,
          length: e.target.length.value,
          height: e.target.height.value,
        }
      })
    });
    const info = await res.json();
    alert(JSON.stringify(info));
  }

  const getActiveLoad = async () => {
    const res = await fetch(LOADS_URL + '/active', {
      headers: REGISTERED_HEADERS,
    })
    const info = await res.json();
    setActiveLoad(JSON.stringify(info))
  }

  const iterateActiveLoad = async () => {
    const res = await fetch(LOADS_URL + '/active/state', {
      method: 'PATCH',
      headers: REGISTERED_HEADERS,
    })
    const info = await res.json();
    alert(info.message)
  }

  const getLoadById = async (e) => {
    e.preventDefault()
    const res = await fetch(LOADS_URL + '/' + e.target.id.value, {
      headers: REGISTERED_HEADERS,
    })
    const info = await res.json();
    setLoadById(JSON.stringify(info));
  }

  const updateLoadById = async (e) => {
    e.preventDefault();
    const res = await fetch(LOADS_URL + '/' + e.target.idForUpdate.value, {
      method: 'PUT',
      headers: REGISTERED_HEADERS,
      body: JSON.stringify({
        name: e.target.nameForUpdate?.value,
        payload: e.target.payloadForUpdate?.value,
        pickup_address: e.target.pickupAddressForUpdate?.value,
        delivery_address: e.target.deliveryAddressForUpdate?.value,
        dimensions: {
          width: e.target.widthForUpdate?.value,
          length: e.target.lengthForUpdate?.value,
          height: e.target.heightForUpdate?.value,
        }
      })
    });
    const info = await res.json();
    console.log(info)
    alert(JSON.stringify(info));
  }

  const deleteLoadById = async (e) => {
    e.preventDefault();
    const res = await fetch(LOADS_URL + '/' + e.target.idForDelete.value, {
      method: 'DELETE',
      headers: REGISTERED_HEADERS,
    });
    const info = await res.json();
    alert(info.message)
  }

  const postLoadById = async (e) => {
    e.preventDefault();
    const res = await fetch(LOADS_URL + '/' + e.target.idForPost.value + '/post', {
      method: 'POST',
      headers: REGISTERED_HEADERS,
    });
    const info = await res.json();
    alert(info.message)
  }

  const getShippingInfo = async (e) => {
    e.preventDefault()
    const res = await fetch(LOADS_URL + '/' + e.target.idForShippingInfo.value + '/shipping_info', {
      headers: REGISTERED_HEADERS,
    })
    const info = await res.json();
    setShippingInfo(JSON.stringify(info));
  }
  return (
    <div>
      <div>
        <h2>Get users loads</h2>
        <form onSubmit={getUsersLoads}>

          <select name="status" id="status">
            <option value="ANY">ANY</option>
            <option value="NEW">NEW</option>
            <option value="POSTED">POSTED</option>
            <option value="ASSIGNED">ASSIGNED</option>
            <option value="SHIPPED">SHIPPED</option>
          </select>
          <input type="number" name={'limit'} id={'limit'} placeholder={'limit'}/>
          <input type="number" name={'offset'} id={'offset'} placeholder={'offset'}/>
          <input type="submit"/>
        </form>
        <div>
          {usersLoads}
        </div>
      </div>
      <div>
        <h2>Create Load</h2>
        <form onSubmit={createLoad}>
          <input type="text" name={"name"} id={'name'} placeholder={'name'}/><br/>
          <input type="text" name={"payload"} id={'payload'} placeholder={'payload'}/><br/>
          <input type="text" name={"pickup_address"} id={'pickup_address'} placeholder={'pickup address'}/><br/>
          <input type="text" name={"delivery_address"} id={'delivery_address'} placeholder={'delivery address'}/><br/>
          <input type="text" name={"width"} id={'width'} placeholder={'width'}/><br/>
          <input type="text" name={"length"} id={'length'} placeholder={'length'}/><br/>
          <input type="text" name={"height"} id={'height'} placeholder={'height'}/><br/>
          <input type="submit"/>
        </form>
      </div>
      <br/>
      <br/>
      <div>
        <button onClick={getActiveLoad}>Get active load for auth driver</button>
        <div>{activeLoad}</div>
      </div>
      <br/><br/>
      <div>
        <button onClick={iterateActiveLoad}>Iterate active load</button>
      </div>
      <div>
        <h2>Get users load by id</h2>
        <form onSubmit={getLoadById}>
          <input type="text" name={'id'} id={'id'} placeholder={'id'}/>
          <input type="submit"/>
        </form>
        <div>
          {loadById}
        </div>
      </div>
      <div>
        <h1>Update Load by id</h1>
        <form onSubmit={updateLoadById}>
          <input type="text" name={'idForUpdate'} id={'idForUpdate'} placeholder={'ID'}/><br/>
          <input type="text" name={'nameForUpdate'} id={'nameForUpdate'} placeholder={'name'}/><br/>
          <input type="text" name={'pickupAddressForUpdate'} id={'pickupAddressForUpdate'} placeholder={'pickup address'}/><br/>
          <input type="text" name={'deliveryAddressForUpdate'} id={'deliveryAddressForUpdate'} placeholder={'delivery address'}/><br/>
          <input type="text" name={'widthForUpdate'} id={'widthForUpdate'} placeholder={'width'}/><br/>
          <input type="text" name={'lengthForUpdate'} id={'lengthForUpdate'} placeholder={'length'}/><br/>
          <input type="text" name={'heightForUpdate'} id={'heightForUpdate'} placeholder={'height'}/><br/>
          <input type="submit"/>
        </form>
      </div>
      <div>
        <h2>Delete Load By Id</h2>
        <form onSubmit={deleteLoadById}>
          <input type="text" name={'idForDelete'} id={'idForDelete'} placeholder={'ID'}/>
          <input type="submit"/>
        </form>
      </div>
      <div>
        <h2>Post Load By ID</h2>
        <form onSubmit={postLoadById}>
          <input type="text" name={'idForPost'} id={'idForPost'} placeholder={'ID'}/>
          <input type="submit"/>
        </form>
      </div>
      <div>
        <h2>Get Shipping Info By Id</h2>
        <form onSubmit={getShippingInfo}>
          <input type="text" name={'idForShippingInfo'} id={'idForShippingInfo'} placeholder={'ID'}/>
          <input type="submit"/>
        </form>
        <div>{shippingInfo}</div>
      </div>
    </div>
  )
}

export default Load;
