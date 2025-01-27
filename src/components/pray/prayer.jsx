import React from 'react'

const Prayer = (Prayer) => {
  return (
    <div className='prayer'>
      <p className='name-prayer'>{Prayer.Name}</p>
      <p className='time-prayer'>{Prayer.Time}</p>
    </div>
  )
}

export default Prayer
