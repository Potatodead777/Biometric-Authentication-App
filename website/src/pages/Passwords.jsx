import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

function Passwords() {
  const [cookies] = useCookies(['uid']);
  const [passwords, setPasswords] = useState([]);
  const [addWeb, setaddWeb] = useState([]);
  const [addPass, setaddPass] = useState([]);

  useEffect(() => {
    // Check if 'uid' is available in cookies
    if (cookies.uid) {
      const grabPass = () => {
        const data = {
          uid: cookies.uid
        };

        fetch('http://localhost:5000/api/password', {
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
      {passwords.length > 0 ? (
        <div>
          {passwords.map((item, index) => (
            <div key={index}>{item.website}</div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div>
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
          <button type="submit">Sign In</button>
      </form>
        <button>Add Password</button>
      </div>
    </div>
  );
}

export default Passwords;
