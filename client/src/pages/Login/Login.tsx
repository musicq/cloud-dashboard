import React, {useState} from 'react'
import {Button} from '../../components/Button'
import {LoginForm} from '../../components/LoginForm'
import {TextInput} from '../../components/TextInput'
import {Auth$} from '../../services/auth.service'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const onSignUp = () => Auth$.signUp(username, pwd, email)

  const onSignIn = () => Auth$.signIn(username, pwd)

  // useEffect(() => {
  //   Auth.currentSession().then(s => console.log(s))
  //   Auth.currentUserInfo().then(s => console.log(s))
  //
  //   fetch('/prod')
  //     .then(res => res.json())
  //     .then(console.log)
  //     .catch(e => {
  //       console.error(e)
  //     })
  //
  //   const response = fetch('/prod', {
  //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
  //     mode: 'cors', // no-cors, *cors, same-origin
  //     cache: 'no-cache', // *default, no-cache, reload, force-cache,
  // only-if-cached credentials: 'same-origin', // include, *same-origin, omit
  // headers: { 'Content-Type': 'application/json' // 'Content-Type':
  // 'application/x-www-form-urlencoded', }, body: JSON.stringify({ userId:
  // 'musicq', dId: 'myclouddashboard', content: 'yes' }) })  response
  // .then(res => res.json()) .then(console.log) .catch(e => { console.error(e)
  // }) }, [])

  return (
    <div className="lg:w-1/3 md:w-1/2 w-11/12 mt-48 mx-auto shadow">
      <LoginForm />
    </div>
  )
}
