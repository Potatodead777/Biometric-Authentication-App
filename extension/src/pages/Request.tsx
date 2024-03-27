import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom'

function Request() {
  const [data, setData] = useState("");
  const [test, setTest] = useState<string>(localStorage.getItem("test") ?? "");
  const [cookies, setCookie] = useCookies(["uid"]);
  const [waiting, setWaiting] = useState(false);
  const navigate = useNavigate();
  const RequestData = () => {
    const temp = JSON.parse(test);
    console.log(JSON.parse(test));
    const idFromLocalStorage = parseInt(localStorage.getItem("id") || "0");
    console.log(temp.data[idFromLocalStorage].toString());
    setData(JSON.stringify(temp.data[idFromLocalStorage]));
    
    const password = temp.data[idFromLocalStorage]?.password; // Extract password property
    console.log("Password:", password);
    
    const data2 = {
      uid: cookies.uid,
      passwordID: temp.data[idFromLocalStorage].id,
      websiteName: temp.data[idFromLocalStorage].website,
      requested_from: "Extension",
      accepted: "u",
    };
    fetch("http://13.51.172.44/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data2),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data
        console.log("test ");
        console.log(responseData.stringify())
        setWaiting(true)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      setWaiting(true)

  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timer | undefined;

    if (waiting === true) {
      intervalId = setInterval(() => {
        constantCall();
      }, 2000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [waiting]);

  const constantCall = () => {
    checkRequest();
    };

  const changePage = (accepted: string) =>{
    console.log(accepted)
    if(accepted == 'y'){
      navigate('/show')
      console.log("request is accepted!")
    }
  }


  
  const checkRequest = () =>{
    const temp = JSON.parse(test);
    const idFromLocalStorage = parseInt(localStorage.getItem("id") || "0");

    const data = {
      uid: cookies.uid,
      passwordID: temp.data[idFromLocalStorage].id,
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
        console.log("response is:")
        console.log(JSON.stringify(responseData));
        changePage(responseData.message[0].accepted)

      })
      .catch(error => {
        console.error('Error:', error);
      });   
  }
  return (
    <div className="request-container">
      <div className="request-div">
        <div className="request-button">
          {data === "" ? (
            <div>
              <div>
                <div>Do you want to request</div>
              </div>
              <br />
              <div className="request-div">
                <div className="request_button clickable" onClick={() => RequestData()}>Request</div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                Accept request on mobile device
              </div>
              <br />
              <div className="loader-div">
                <div className='loader'></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Request;
