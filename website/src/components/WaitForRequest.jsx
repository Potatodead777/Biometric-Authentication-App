import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'

function WaitForRequest({showPassword, setShowPassword, waitFor, setWaitFor, uid, text}) {
  const [test, setTest] = useState('test1')
  useEffect(() => {
    setTest('test2')
  }, [waitFor]);

  const checkRequest = () =>{
    const data = {
      uid: uid,
      passwordID: text
    }
    console.log(data)

    fetch('http://localhost/api/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        // Handle the response data
        console.log("tesr");

        console.log(responseData);
        test3(responseData)
      })
      .catch(error => {
        console.error('Error:', error);
      });   
  }

  const test3 = (temp) => {
    console.log("tes2   t",  temp)
  }

  return (
    <div>
        <Popup modal open={waitFor} nested>
            <div className='waiting-div'>
                <span>{test}</span>
                <div className='loader-request'></div>
                <div>
                  <button onClick={() => checkRequest()}>Ive Accepted</button>
                </div>
            </div>
        </Popup>
    </div>
  )
}

export default WaitForRequest