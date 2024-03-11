import React, { useState, useEffect } from "react";
import '../App.css'
function Show() {
  const [test, setTest] = useState<string>(localStorage.getItem("test") ?? "");
  const [pass, setPass] = useState("");
  const [title, setTitle] = useState()
  const [vis, setVis] = useState(false)
  const RequestData = () => {
    const temp = JSON.parse(test);
    const idFromLocalStorage = parseInt(localStorage.getItem("id") || "0");
    console.log(temp.data[idFromLocalStorage].toString());

    const password = temp.data[idFromLocalStorage]?.password; // Extract password property
    setPass(password)
    setTitle(temp.data[idFromLocalStorage]?.website)
    console.log("Password:", password);
  };

  useEffect(() => {
    RequestData();
  }, []); 

  return (
    <div className="show-div">
      <div className="show-title">
        Your password for <span>{title}</span>
      </div>
      <br />
      <div className="outer-pass">
        <div className="inner-pass">{vis == true ? (<span>{pass}</span>) : (<span>**************</span>)}</div>
      </div>
      <div className="show-div">
        <div className="show-inner">
          {vis === true ? (<span className="material-symbols-outlined nonselect clickable" onClick={() => setVis(false)}>visibility</span>) : (<span className="material-symbols-outlined nonselect clickable" onClick={() => setVis(true)}>visibility_off</span>)}
        </div>
      </div>
    </div>
  );
}

export default Show;
