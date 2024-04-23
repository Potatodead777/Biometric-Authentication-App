import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import Addpass from '../components/Addpass';
import PasswordBox from '../components/PasswordBox';
function Passwords() {
  const [cookies] = useCookies(['uid']);
  const [passwords, setPasswords] = useState([]);

  useEffect(() => {
    // Check if 'uid' is available in cookies
    if (cookies.uid) {
      const grabPass = () => {
        const data = {
          uid: cookies.uid
        };

        fetch('http://16.170.240.58/api/password', {
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
            setPasswords(responseData.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };

      grabPass();
    }
  }, [cookies.uid]);


  return (
    <div>
      <section className='Password-Main-Add-Section'>
        <Addpass></Addpass>
      </section>
      <section className='Password-Section'>
        <section className='Password-Main-Section'>
          <section className='Password-Main-Inner'>
            {passwords.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {passwords.map((item, index) => (
                  <PasswordBox text={item} index={index} />
                ))}
              </div>
            ) : (
              <div className='test2'>
                <div className='loader'></div>
              </div>
            )}
          </section>
        </section>
      </section>
    </div>
  );
}

export default Passwords;
