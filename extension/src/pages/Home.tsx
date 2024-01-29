import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import '../App.css'
function Home() {
  const [cookies, setCookie] = useCookies(['uid']);
  const [webNames, setWebNames] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    if (cookies.uid == null || cookies.uid == 'none') {
      navigate('/signin')
    }
    getWebNames();

  }, [])
  
  const getWebNames = () =>{
      const data = {
        uid: cookies.uid
      };

      fetch('http://13.51.172.44/api/password', {
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
          setWebNames(responseData.data);
        })
        .catch(error => {
          console.error('Error:', error);
        }); 
  }

  return (
    <div className='waiting'>Waiting for website signin page
    <div>{webNames.toString()}</div>
    
    </div>
  )
}

export default Home