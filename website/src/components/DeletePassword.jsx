import React from 'react'
import Popup from 'reactjs-popup'

function DeletePassword({showDelete, text, setShowDelete}) {

    const DeletePassword = () => {
        const data = {
          id: text
        }

        fetch('http://localhost/api/password', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(response => response.json())
            .then(responseData => {
                setShowDelete(false)
            })
            .catch(error => {
              console.error('Error:', error);
            });   
        }

  return (
        <Popup modal open={showDelete} nested>
        <div className='delete-div'>
            <div className='Delete-Website'>
                Are you sure you want to delete this password?
            </div>
            <div className='password-view-buttons'>
                <button onClick={() => DeletePassword()} className='requestButtons'>
                    Yes
                </button>
                <button className='requestButtons' onClick={() => setShowDelete(false)}>
                    No
                </button>
            </div>
        </div>
    </Popup>  
)
}

export default DeletePassword