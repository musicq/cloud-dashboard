import React from 'react'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import {Guard} from './components/Guard'
import {Launch} from './components/Launch'
import {Dashboard} from './pages/Dashboard'
import {Login} from './pages/Login'
import {NewProject} from './pages/NewProject'
import {useAuthConfig} from './shared/useAuthConfig'
import {useCurrentUser} from './shared/useCurrentUser'

export function App() {
  useAuthConfig()
  const {user, loading} = useCurrentUser()

  const guard = () => Boolean(user)

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
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Guard guard={guard} path="/dashboard">
          <Dashboard />
        </Guard>
        <Guard guard={guard} path="/new-project">
          <NewProject />
        </Guard>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
