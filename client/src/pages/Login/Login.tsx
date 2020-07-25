import React from 'react'
import {LoginForm} from '../../components/LoginForm'
import {Logo} from '../../components/Logo'

export const Login = () => {
  return (
    <div>
      <div className="px-4 py-1">
        <Logo />
      </div>

      <div className="lg:w-1/3 md:w-1/2 w-11/12 mt-48 mx-auto shadow">
        <LoginForm />
      </div>
    </div>
  )
}
