import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import '../App.css'
import { useCookies } from 'react-cookie';

function Addpass() {
  const [addWeb, setaddWeb] = useState([]);
  const [addPass, setaddPass] = useState([]);
  const [cookies] = useCookies(['uid']);
  const [open, setOpen] = useState(false)
  const addPasswordFunction = () => {
    const data = {
      uid: cookies.uid,
      website: addWeb,
      password: addPass
    }

    fetch('http://localhost:5000/api/password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        // Handle the response data
        console.log(responseData);
      })
      .catch(error => {
        console.error('Error:', error);
      });

  }
  return (
    <div>
      <button className='AddNewPasswordButton' onClick={() => setOpen(!open)}> + </button>


      
      <Popup modal open={open}>
        <div className='pop-up-background' onClick={() => setOpen(!open)}>
          <div className='pop-up-add-password'>
            <section className='new-password-title'>
              Add New Password
            </section>
            <form onSubmit={(event) => addPasswordFunction(event)}>
              <input
                placeholder='Website'
                id='addWebsite'
                onChange={(e) => setaddWeb(e.target.value)}
              />
              <input
                placeholder='Password'
                id='addPassword'
                onChange={(e) => setaddPass(e.target.value)}
              />
              <button type="submit">Add Password</button>
            </form>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default Addpass