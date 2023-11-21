import React, {useEffect, useState} from 'react'

function PasswordBox({ text }) {
  const [website, setWebsite] = useState('')


  useEffect(() => {
    const remove = () =>{
      const modifiedString = text.website.replace(/(www\.|\.co\.uk|\.com)/g, '');
      const capitalizedString = modifiedString.charAt(0).toUpperCase() + modifiedString.slice(1)
      setWebsite(capitalizedString)

    }

    remove();
  }, [])
  

  return (
    <div className='PasswordBox clickable'>
      <section className='Password-Website'>
        {website}
      </section>
      <section className='Password-Request-Button-Div'>
        <button className='Password-Request-Button clickable'>
          Request
        </button>
      </section>
    </div>
  )
}

export default PasswordBox