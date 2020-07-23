import {Auth} from 'aws-amplify'
import React, {useEffect, useState} from 'react'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const onSignUp = () => Auth.signUp({
    username,
    password: pwd,
    attributes: {
      email: email
    }
  })

  const onSignIn = () => Auth.signIn({
    username,
    password: pwd
  })

  useEffect(() => {
    Auth.currentSession().then(s => console.log(s))
    Auth.currentUserInfo().then(s => console.log(s))

    fetch('/prod').then(res => res.json()).then(console.log).catch(e => {
      console.error(e)
    })

    const response = fetch('/prod', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({userId: 'musicq', dId: 'myclouddashboard', content: 'yes'})
    })

    response.then(res => res.json()).then(console.log).catch(e => {
      console.error(e)
    })
  }, [])

  return (
    <div className="App">
      <input type="username" onChange={e => setUsername(e.target.value)}/>
      <input type="email" onChange={e => setEmail(e.target.value)}/>
      <input type="password" onChange={e => setPwd(e.target.value)}/>

      <button onClick={onSignUp}>Sign up</button>

      <hr/>

      <input type="username" onChange={e => setUsername(e.target.value)}/>
      <input type="password" onChange={e => setPwd(e.target.value)}/>

      <button onClick={onSignIn}>Sign in</button>
    </div>
  )
}

export default App
