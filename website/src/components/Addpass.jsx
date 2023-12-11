import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import '../App.css'
import { useCookies } from 'react-cookie';

function Addpass() {
  const [addWeb, setaddWeb] = useState();
  const [addWebName, setaddWebName] = useState();
  const [addPass, setaddPass] = useState();
  const [info, setInfo] = useState('');
  const [addVis, setAddVis] = useState('visibility');
  const [type, setType] = useState('password');
  const [cookies] = useCookies(['uid']);
  const addPasswordFunction = (event) => {
    event.preventDefault()
    const data = {
      uid: cookies.uid,
      website: addWeb,
      password: addPass,
      info: info
    }

    fetch('http://localhost/api/password', {
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

  const createPassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-";
    let password = '';

    for (let i = 0; i < Math.floor(Math.random() * (4)) + 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    console.log(password)
    setaddPass(password)
  }

  const changeIcon = () => {
    if(addVis == 'visibility'){
      setAddVis('visibility_off')
      setType('input')

    }else{
      setAddVis('visibility')
      setType('password')

    }
  }
  return (
    <div>
      <Popup modal trigger={<button className='AddNewPasswordButton clickable'> + </button>}>
        <div>
          <div className='pop-up-add-password'>
            <section className='new-password-title'>
              Add New Password
            </section>
            <section className='add-password-form'>
              <form onSubmit={(event) => addPasswordFunction(event)}>
              <br />

                <label htmlFor="addWebsite">Website URL</label>
                <br />
                <input
                  placeholder='Website URL'
                  id='addWebsite'
                  value={addWeb}
                  onChange={(e) => setaddWeb(e.target.value)}
                  required
                />


                <br />
                <label htmlFor="addWebsiteName">Website Name (Optional)</label>
                <br />
                <input
                  placeholder='Website Name '
                  id='addWebsiteName'
                  value={addWebName}
                  onChange={(e) => setaddWebName(e.target.value)}
                />


                <br />
                <label htmlFor="addPassword">Password</label>
                <div style={{display: 'flex'}}>
                <br />
                <div>
                </div>
                <input
                  type={type}
                  placeholder='Password'
                  id='addPassword'
                  value={addPass}
                  onChange={(e) => setaddPass(e.target.value)}
                  required
                />
                <div className='hide material-symbols-outlined clickable nonselect' onClick={() => changeIcon()}>{addVis}</div>
                <div style={{display: 'flex', color: '#1d4ed8', textDecoration: 'underline'}} className='clickable nonselect' onClick={() => createPassword()}>Generate Password</div>
                </div>
                <br />



                <label htmlFor="addwebsiteinfo">Additional Information</label>
                <br />
                <textarea 
                placeholder='Add some extra info here! (Optional)' 
                id="addwebsiteinfo" 
                rows="10" 
                className='extraInfo'
                value={info}
                onChange={(e) => setInfo(e.target.value)}

                />
                <br />
                <button type="submit" className='addPasswordBox'>Add Password</button>
              </form>
            </section>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default Addpass