import React from 'react'
import logo from '../images/logo.png'
import passwordImage from '../images/passwordimage.png'
import Mobile from '../images/mobile.png'
function Homepage() {
  return (
    <div className="App">
      <div className='homepage'>
      <section className='homepage-first'>
        <h1 className='titlefirst' data-testid="home-first-h">Welcome to BioPass</h1>
        <p className='pfirst' data-testid="home-first-p">
          A biometric password manager giving a <b>personal</b> security layer to your passwords. Use your fingerprint to authorize the password retrieval. Ensure that you're the person accessing your password with BioPass.
        </p>
      </section>
      <section className='homepage-second'>
        <img src={logo} alt="" className='imagetest' data-testid="home-image"/>
      </section>
      </div>
      <div className='homepage' >
      <section className='homepage-first' >
      <img src={passwordImage} alt="" className='imagetest' data-testid="home-image-2"/>
      </section>
      <section className='homepage-second' data-testid="home-second">
        <p className='pfirst' data-testid="home-first-p-2">Simply store your passwords on your account, request them from this website or using the browser extension. Store and generate passwords for any website, have full control over your account and passwords with BioPass.</p>
      </section>
      </div>
      <div className='homepage'>
      <section className='homepage-first'>
        <p className='pfirst'>
          Using the mobile application, accept or deny requests sent through your proifile to recieve your encrypted password. See passwords that have been requested within the last two weeks.
        </p>
      </section>
      <section className='homepage-second'>
        <img src={Mobile} alt="" className='imagetest' data-testid="home-mobile"/>
      </section>
      </div>
    </div>  
  )
}

export default Homepage