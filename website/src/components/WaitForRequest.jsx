import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'

function WaitForRequest({showPassword, setShowPassword, waitFor, setWaitfor, uid, text}) {
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
    if(test2 === 'y'){
      setShowPassword(true)
      setWaitfor(false)
      console.log("test is U")
    }else if (test2 === 'n'){
      setShowPassword(false)
      setWaitfor(false)
      removeItem(temp.message[0].id)
    }else{

    }
    console.log("tes2   t",  temp)
    console.log(temp.message[0].accepted)
  }

  const removeItem = (id) => {
    fetch(`http://13.48.147.244/api/check/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseData => {
      })
      .catch(error => {
        console.error('Error:', error);
      }); 
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