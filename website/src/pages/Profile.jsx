import React from 'react'
import { useCookies } from 'react-cookie';

function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(['uuid']);

  const signOut = () => {
    removeCookie("uid")
  }
  return (
    <div>
      <div className='profile-div'>
        <span data-testid="profile-title" className='profile-title'>Profile</span>
        <div className='profile-buttons'>
          <button onClick={() => signOut()} data-testid="profile-button">Sign Out</button>
        </div>
      </div>
    </div>
  )

}

export default Profile