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

    fetch('http://13.48.147.244/api/check', {
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
    var test2 = temp.message[0].accepted;
    if(test2 === 'u'){
      console.log("test is U")
    }else{
      console.log("test is not U")
    }
    console.log("tes2   t",  temp)
    console.log(temp.message[0].accepted)
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