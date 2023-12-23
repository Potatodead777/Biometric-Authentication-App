import React, {useState, useEffect} from 'react'
import Popup from 'reactjs-popup'

function EditPassword({showEdit, text, websitename}) {
    const [editWeb, seteditWeb] = useState(text.website);
    const [editWebName, seteditWebName] = useState(); 
    const [editPass, seteditPass] = useState(text.password);
    const [info, setInfo] = useState(text.extraInfo);
    const [editVis, seteditVis] = useState('visibility');
    const [type, setType] = useState('password');

    useEffect(() => {
        const remove = () => {
          const modifiedString = text.website.replace(/(www\.|\.co\.uk|\.com)/g, '');
          const capitalizedString = modifiedString.charAt(0).toUpperCase() + modifiedString.slice(1)
            seteditWebName(capitalizedString)
        }
    
        remove();
      }, [text.website])


    const createPassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-";
        let password = '';
    
        for (let i = 0; i < Math.floor(Math.random() * (4)) + 12; i++) {
          const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
        }
        console.log(password)
        seteditPass(password)
      }
    

      //create fetch patch for api change password

  return (
        <Popup modal open={showEdit} nested>
        <div>
          <div className='pop-up-add-password'>
            <section className='new-password-title'>
              Edit {editWebName}
            </section>
            <section className='add-password-form'>
              <form >
              <br />

                <label htmlFor="addWebsite">Website URL</label>
                <br />
                <input
                  placeholder='Website URL'
                  id='addWebsite'
                  value={editWeb}
                  onChange={(e) => seteditWeb(e.target.value)}
                  required
                />


                <br />

                <label htmlFor="addPassword">Password</label>
                <div style={{display: 'flex'}}>
                <br />
                <div>
                </div>
                <input
                  type={type}
                  placeholder='Password'
                  id='addPassword'
                  onChange={(e) => seteditPass(e.target.value)}
                  required
                />
                <div className='hide material-symbols-outlined clickable nonselect'>{editVis}</div>
                <div style={{display: 'flex', color: '#1d4ed8', textDecoration: 'underline'}} className='clickable nonselect' onClick={() => createPassword()}>Generate Password</div>
                </div>
                <br />



                <label htmlFor="addwebsiteinfo">Additional Information</label>
                <br />
                <textarea 
                placeholder='Add some extra info here! (Optional)' 
                id="addwebsiteinfo" 
                rows="10" 
                className='extraInfo'
                value={info}
                onChange={(e) => setInfo(e.target.value)}

                />
                <br />
                <button type="submit" className='addPasswordBox'>Confirm</button>
                <button type="submit" className='addPasswordBox'>No</button>

              </form>
            </section>
          </div>
        </div>
    </Popup>    
)
}

export default EditPassword