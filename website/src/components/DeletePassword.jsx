import React from 'react'
import Popup from 'reactjs-popup'

function DeletePassword({showDelete, text, setShowDelete}) {

    const DeletePassword = () => {
        const data = {
          id: text

        }

        fetch('http://13.48.147.244/api/check', {
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
        <div className='waiting-div'>
            <div>
                Are you sure you want to delete this password?
            </div>
            <div>
                <button onClick={() => DeletePassword()}>
                    Yes
                </button>
                <button>
                    No
                </button>
            </div>
        </div>
    </Popup>  
)
}

export default DeletePassword