import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'

function WaitForRequest({setShowPassword, waitFor, setWaitfor, uid, text}) {
  const [test, setTest] = useState('test1')
  useEffect(() => {
    let intervalId;

    if (waitFor === true) {
      intervalId = setInterval(() => {
        constantCall();
      }, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [waitFor]);

  const constantCall = () => {
    checkRequest();
    };


  useEffect(() => {
    setTest('test2')
  }, [waitFor]);

  const checkRequest = () =>{
    const data = {
      uid: uid,
      passwordID: text
    }
    console.log(data)

    fetch('http://13.51.172.44/api/check', {
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
      removeItem(temp.message[0].id)
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
    const data = {
      id: id
    }
    fetch(`http://13.51.172.44/api/requests/uid`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(responseData)
      })
      .catch(error => {
        console.error('Error:', error);
      }); 
  }
  return (
    <div>
        <Popup modal open={waitFor} nested>
            <div className='waiting-div'>
                <span className='request-title'>Please don't leave this page, accept request on mobile</span>
                <div className='loader-request'></div>
            </div>
        </Popup>
    </div>
  )
}

export default WaitForRequest