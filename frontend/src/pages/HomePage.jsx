import React from 'react'
import { Navigate } from 'react-router'

const HomePage = () => {
  return (
    <div>
      Homepage

      <button onClick={<Navigate to="/signup" />}>signup</button>
    </div>
  )
}

export default HomePage
