import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import '../App.css'

/// <reference types="chrome"/>


function Home() {
  const [cookies, setCookie] = useCookies(['uid']);
  const [webNames, setWebNames] = useState<string[]>([]);
  const [currentUrl, setCurrentUrl] = useState('');
  const [test, setTest] = useState('')
  const [data, setData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    if (cookies.uid == null || cookies.uid == 'none') {
      navigate('/signin')
    }
    getWebNames();
  }, [])
  
  interface DataItem {
    website: string;
    // other properties if any
  }

  useEffect(() => {
    // Fetch the current URL of the active tab when the component mounts
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Use optional chaining to safely access properties
      const url = tabs?.[0]?.url;
      if (url) {
        var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
        if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
          var hostname = match[2].split(".");
          setCurrentUrl(url);
        }
      }
    });
  }, []);

  useEffect(() => {
    checkURL()
  }, [webNames])
  

  const checkURL = () => {
    console.log(webNames)
    webNames.forEach((element, index) => {
    console.log(element + index)
    if(currentUrl.includes(element.toLowerCase())) {
      localStorage.setItem('id', index.toString())
      console.log('true ' + element)
      navigate('/request')
      return;
    }else{
      console.log('false ' + element.toLowerCase() + " " + currentUrl)
    }
  })
  }

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
          localStorage.setItem('test', JSON.stringify(responseData))
          setData(responseData)
          setWebNames(responseData.data);
          const websiteArray: string[] = responseData.data.map((item: DataItem) => item.website);

          setWebNames(websiteArray);
          checkURL()
        })
        .catch(error => {
          console.error('Error:', error);
        }); 
  }


  return (
    <div className='waiting-div'>
      <div className='waiting'>Waiting for website signin page</div>
    </div>
  )
}

export default Home