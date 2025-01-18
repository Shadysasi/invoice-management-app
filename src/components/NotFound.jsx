import React from 'react'
import {Link} from "react-router-dom"

const NotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to='/home'>Go Back to Home</Link>
    </div>
  )
}

export default NotFound