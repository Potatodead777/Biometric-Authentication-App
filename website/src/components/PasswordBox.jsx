import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import { useCookies } from 'react-cookie';
import WaitForRequest from './WaitForRequest';
import DeletePassword from './DeletePassword';
import EditPassword from './EditPassword';

function PasswordBox({ text }) {
  const [website, setWebsite] = useState('')
  const [cookies] = useCookies(['uid']);
  const [showPassword, setShowPassword] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [waitFor, setWaitfor] = useState(false);
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    const remove = () => {
      const modifiedString = text.website.replace(/(www\.|\.co\.uk|\.com)/g, '');
      const capitalizedString = modifiedString.charAt(0).toUpperCase() + modifiedString.slice(1)
      setWebsite(capitalizedString)

    }

    remove();
  }, [])

  
  const requestPassword = () => {
    setWaitfor(true)
    console.log('Test')
    const data = {
      uid: cookies.uid,
      passwordID: text.id,
      websiteName: text.website,
      accepted: 'u'
    }

    fetch('http://13.48.147.244/api/requests', {
          method: 'POST',
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
      };


  return (
    <div className='PasswordBox clickable'>
      <section className='Password-Website'>
        {website}
      </section>
      <section className='Password-Request-Button-Div'>
        <Popup trigger={<button className='Password-Request-Button clickable'> View </button>} modal nested>
          <div>
            <div className='pop-up-add-password'>
              <section className='new-password-title'>
                {website}
              </section>
              <div className='test'>
                <label>Website URL</label>
                <div className='display-text'>
                  {text.website}
                </div>
                <br />
                <label>Website Password</label>
                <div className='display-text'>
                  {showPassword === false ? ('************') : (text.password)}
                </div>
                <label>Extra Information</label>
                <div className='display-text-area'>
                {text.extraInfo === null ? (
                  'No extra information added for this password'
                ) : (
                  text.extraInfo
                )}

                </div>
                <div className='password-view-buttons'>
                  <button onClick={() => requestPassword()} className='requestButtons'>
                    Request Password
                  </button>
                  <button className='requestButtons' onClick={() => setShowEdit(true)}>
                    Edit Password
                  </button>
                  <button className='requestButtons' onClick={() => setShowDelete(true)}>
                    Delete Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popup>
        <WaitForRequest setShowPassword={setShowPassword} showPassword={showPassword} setWaitfor={setWaitfor} waitFor={waitFor} uid={cookies.uid} text={text.id}></WaitForRequest>
        <DeletePassword showDelete={showDelete} text={text.id} setShowDelete={setShowDelete}/>
        <EditPassword showEdit={showEdit} setShowEdit={setShowEdit} text={text} websitename={website}></EditPassword>
      </section>

    </div>
  )
}

export default PasswordBox