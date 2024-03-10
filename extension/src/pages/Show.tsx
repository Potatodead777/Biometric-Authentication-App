import React, { useState, useEffect } from "react";

function Show() {
  const [test, setTest] = useState<string>(localStorage.getItem("test") ?? "");
  const [pass, setPass] = useState("");

  const RequestData = () => {
    const temp = JSON.parse(test);
    const idFromLocalStorage = parseInt(localStorage.getItem("id") || "0");
    console.log(temp.data[idFromLocalStorage].toString());

    const password = temp.data[idFromLocalStorage]?.password; // Extract password property
    setPass(password)
    console.log("Password:", password);
  };

  useEffect(() => {
    RequestData();
  }, []);

  return (
    <div>
      <div>{pass}</div>
    </div>
  );
}

export default Show;
