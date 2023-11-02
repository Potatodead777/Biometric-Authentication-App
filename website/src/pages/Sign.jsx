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
        if(cookies.uid != null){
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
      
        fetch('http://localhost:5000/user', {
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
        fetch('http://localhost:5000/user')
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
  
        fetch('http://localhost:5000/api/signin', {
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
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
  
      const SignUpFunction = () => {
  
      }
  return (
    <div className="App">
    <div>
      <form onSubmit={(event) => SignInFunction(event)}>
          <input 
          placeholder='Email' 
          id='signInEmail'
          onChange={(e) => setInEmail(e.target.value)}
          />
          <input 
              placeholder='Password' 
              id='signInPassword'
              onChange={(e) => setInPass(e.target.value)}
          />
          <button type="submit">Sign In</button>
      </form>
  
      <form onSubmit={() => SignUpFunction()}>
          <input placeholder='Email' id='signUpEmail'>
          </input>
          <input placeholder='Password' id='signUpPassword'>
          </input>   
          <button type="submit">Sign Up</button>
      </form>
  
    </div>
  </div>  
  )
}

export default Sign