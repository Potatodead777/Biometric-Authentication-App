import React, { useEffect, useState } from 'react'
import '../App.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';
function Signin() {

  const [cookies, setCookie] = useCookies(['uid']);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if(cookies.uid != 'none' || cookies.uid == null)
    navigate('/')

  }, [cookies.uid])

  const SignInFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('test')
    const data = {
      email: email,
      password: password,
    };

    fetch('http://16.170.240.58/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        // Handle the response data
        setCookie('uid', responseData.data);
        console.log('complete')
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  return (
    <div >
      <div className='sign-in'>
        <form onSubmit={(e) => SignInFunction(e)}>
          <span>
            Sign In
          </span>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
          <p>Create An Account on the website</p>
        </form>
      </div>
    </div>
  )
}

export default Signin