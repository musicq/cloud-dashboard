import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {AppBar} from '../../components/AppBar'
import {Dashboard} from '../Dashboard'
import {NewProject} from '../NewProject'

export const Home = () => {
  return (
    <AppBar>
      <Switch>
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/new-project">
          <NewProject />
        </Route>
      </Switch>
    </AppBar>
  )
}
