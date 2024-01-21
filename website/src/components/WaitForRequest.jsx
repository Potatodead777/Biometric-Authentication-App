import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'

function WaitForRequest({showPassword, setShowPassword, waitFor, setWaitfor, uid, text}) {
  const [test, setTest] = useState('test1')
  const [shouldCallFunction, setShouldCallFunction] = useState(false);

  useEffect(() => {
    let intervalId;

    if (waitFor === true) {
      intervalId = setInterval(() => {
        // Call your function here
        yourFunction();
      }, 2000); // Interval of 2 seconds (2000 milliseconds)
    }

    return () => {
      // Clean up the interval when the component unmounts or when shouldCallFunction becomes false
      clearInterval(intervalId);
    };
  }, [waitFor]);

  // Your function to be called every 2 seconds if shouldCallFunction is true
  const yourFunction = () => {
    // Your logic here
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
    fetch(`http://localhost/api/requests/uid`, {
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