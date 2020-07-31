import React, {useCallback} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Guard} from './components/Guard'
import {Launch} from './components/Launch'
import {Home} from './pages/Home'
import {Login} from './pages/Login'
import {useAuthConfig} from './shared/useAuthConfig'
import {useCurrentUser} from './shared/useCurrentUser'

export function App() {
  useAuthConfig()
  const {user, loading} = useCurrentUser()

  const guard = useCallback(() => Boolean(user), [user])

  if (loading) {
    return (
      <div className="absolute w-full h-full">
        <Launch />
      </div>
    )
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Guard guard={guard} path="/">
          <Home />
        </Guard>
      </Switch>
    </BrowserRouter>
  )
}
