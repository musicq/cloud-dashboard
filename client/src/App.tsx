import React from 'react'
import {Login} from './pages/Login'
import {useAuthConfig} from './shared/useAuthConfig'
import {useCurrentUser} from './shared/useCurrentUser'

function App() {
  useAuthConfig()
  const user = useCurrentUser()

  console.log(user)

  return user ? <div>you are in now</div> : <Login/>
}

export default App
