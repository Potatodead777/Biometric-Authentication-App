import React from 'react'
import { useCookies } from 'react-cookie';

function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(['uuid']);

  const signOut = () => {
    removeCookie("uid")
  }
  return (
    <div>Profile


      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Profile