import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

const Login = () => {


  return (
    <div>
      <a href="/google">
        <button>
          Sign in with Google
        </button>
      </a>
    </div>
  )
}

export default Login