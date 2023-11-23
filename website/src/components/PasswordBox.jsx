import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
function PasswordBox({ text }) {
  const [website, setWebsite] = useState('')


  useEffect(() => {
    const remove = () => {
      const modifiedString = text.website.replace(/(www\.|\.co\.uk|\.com)/g, '');
      const capitalizedString = modifiedString.charAt(0).toUpperCase() + modifiedString.slice(1)
      setWebsite(capitalizedString)

    }

    remove();
  }, [])


  return (
    <div className='PasswordBox clickable'>
      <section className='Password-Website'>
        {website}
      </section>
      <section className='Password-Request-Button-Div'>
        <Popup trigger={<button className='Password-Request-Button clickable'> View </button>} modal>
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
                  {text.password}
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
                  <button>
                    Request Password
                  </button>
                  <button>
                    Edit Password
                  </button>
                  <button>
                    Delete Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Popup>
      </section>

    </div>
  )
}

export default PasswordBox