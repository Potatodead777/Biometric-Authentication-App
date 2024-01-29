import React from 'react'
import '../App.css'
function Signin() {
  return (
    <div >
        <div className='sign-in'>
        <form>
            <span>
                Sign In
            </span>
            <input type="email" />
            <input type="password" />
            <button type="submit">Sign In</button>
            <p>Create An Account on the website</p>
        </form>  
        </div>
    </div>
  )
}

export default Signin