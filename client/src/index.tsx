import Amplify from 'aws-amplify'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'

const cognito = {
  REGION: 'ap-northeast-1',
  USER_POOL_ID: 'ap-northeast-1_VjzewlkNy',
  APP_CLIENT_ID: '3mepta92g3a4au4bkvk9fptn64'
}

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: cognito.REGION,
    userPoolId: cognito.USER_POOL_ID,
    userPoolWebClientId: cognito.APP_CLIENT_ID
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
