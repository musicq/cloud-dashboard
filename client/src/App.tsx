import React from 'react'
import {Launch} from './components/Launch/Launch'
import {Dashboard} from './pages/Dashboard'
import {Login} from './pages/Login'
import {useAuthConfig} from './shared/useAuthConfig'
import {useCurrentUser} from './shared/useCurrentUser'

function App() {
  useAuthConfig()
  const {user, loading} = useCurrentUser()

  console.log(user)

  if (loading) {
    return (
      <div className="absolute w-full h-full">
        <Launch/>
      </div>
    )
  }

  return user ? <Dashboard/> : <Login/>
}

export default App
