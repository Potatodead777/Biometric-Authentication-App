import React, { useState } from 'react';

function Request() {
  const [data, setData] = useState('');

  const testt = () => {
    setData('a')
  }

  const RequestData = () => {
    
  }

  return (
    <div className='request-container'>
      <div className='request-div'>
        <div className='request-button'>
          {data === '' ? 
          (<div className='request_button' onClick={() => testt()}>Request</div>) 
          : 
          (<div>Request2</div>)}
        </div>
      </div>
    </div>
  );
}

export default Request;
