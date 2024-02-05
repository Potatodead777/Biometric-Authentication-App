import React, { useState } from 'react';
import { useCookies } from 'react-cookie'

function Request() {
  const [data, setData] = useState('');
  const [test, setTest] = useState<string>(localStorage.getItem('test') ?? '');
  const [cookies, setCookie] = useCookies(['uid']);


  const RequestData = () => {
    const temp = JSON.parse(test)
    console.log(JSON.parse(test))
    const idFromLocalStorage = parseInt(localStorage.getItem('id') || '0');
    console.log(temp.data[idFromLocalStorage].toString())
    setData(JSON.stringify(temp.data[idFromLocalStorage]));

    const data2 = {
      uid: cookies.uid,
      passwordID: temp.data[idFromLocalStorage].id,
      websiteName: temp.data[idFromLocalStorage].website,
      accepted: 'u'
    }
    fetch('http://13.51.172.44/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data2),
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
    <div className='request-container'>
      <div className='request-div'>
        <div className='request-button'>
          {data === '' ?
            (<div className='request_button' onClick={() => RequestData()}>Request</div>)
            :
            (<div>{data?.toString()}</div>)}
        </div>
      </div>
    </div>
  );
}

export default Request;
