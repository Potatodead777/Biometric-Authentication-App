import React from 'react'
import { useCookies } from 'react-cookie';

function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(['uuid']);

  const signOut = () => {
    removeCookie("uid")
  }
  return (
    <div>
      <span data-testid="profile-title">Profile</span>
      <span data-testid="profile-number">Number of Passwords: </span>
      <button onClick={() => signOut()} data-testid="profile-sign">Sign Out</button>
      <button data-testid="profile-delete">Delete Account</button>
    </div>
  )
}

export default Profile