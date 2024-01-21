import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

function Sign() {
  const [InEmail, setInEmail] = useState('');
  const [InPass, setInPass] = useState('');
  const [cookies, setCookie] = useCookies(['uuid']);
  const navigate = useNavigate();
  useEffect(() => {
    const isSignedIn = () => {
      if (cookies.uid != null && cookies.uid != 'undefined') {
        console.log("cookie exists: " + cookies.uid)
        navigate('/passwords');
      }
    }

    isSignedIn()
  }, [])



  const postData = () => {
    const data = {
      email: 'example@example.com',
      password: 'secretPassword',
    };

    fetch('http://localhost/user', {
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


  const getData = () => {
    fetch('http://localhost/user')
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const SignInFunction = (event) => {
    event.preventDefault();
    console.log("rea")
    const data = {
      email: InEmail,
      password: InPass,
    };

    fetch('http://localhost/api/signin', {
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
        setCookie('uid', responseData.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const SignUpFunction = () => {

  }
  return (
    <div className='test5'>
      <div className='sign-in-div'>
        <form onSubmit={(event) => SignInFunction(event)} className='test4'>
          <div className='sign-in-title'>
            <u>Sign In</u>
          </div>
          <input
            placeholder='Email'
            id='signInEmail'
            onChange={(e) => setInEmail(e.target.value)}
            className='test7'
          />
          <input
            placeholder='Password'
            id='signInPassword'
            onChange={(e) => setInPass(e.target.value)}
            className='test7'

          />
          <div className='sign-in-button-div'>
            <button type="submit" className='sign-in-button-2 clickable'>Sign In</button>

          </div>
        </form>
        <section className='test6'>
        </section>
        <form onSubmit={() => SignUpFunction()} className='test4'>
          <div className='sign-in-title'>
            <u>Sign Up</u>
          </div>
          <input placeholder='Email' id='signUpEmail' className='test7'>
          </input>
          <input placeholder='Password' id='signUpPassword' className='test7'>
          </input>
          <div className='sign-in-button-div'>
            <button type="submit" className='sign-in-button-2 clickable'>Sign Up</button>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Sign