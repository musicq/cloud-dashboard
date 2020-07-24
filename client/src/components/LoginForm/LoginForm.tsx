import React, {SyntheticEvent, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Auth$} from '../../services/auth.service'
import {Button} from '../Button'
import {TextInput} from '../TextInput'

enum Type {
  Login,
  Register,
  ConfirmSingUp
}

export const LoginForm = () => {
  const [type, setType] = useState(Type.Login)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [code, setCode] = useState('')
  const history = useHistory()

  const onSignIn = async () => {
    if (!username || !password) {
      return alert("You haven't finished all the fields.")
    }

    setSubmitting(true)
    const userInfo = await Auth$.signIn(username, password)
    setSubmitting(false)

    if (userInfo) {
      history.push('/')
    }
  }

  const onSignUp = async () => {
    if (!username || !password || !email) {
      return alert("You haven't finished all the fields.")
    }

    setSubmitting(true)
    const isOk = await Auth$.signUp(username, password, email)
    setSubmitting(false)

    if (!isOk) {
      return alert('Sign-up failed, please try other username or try latter.')
    }

    setType(Type.ConfirmSingUp)
  }

  const onConfirmed = async () => {
    if (!code) {
      return alert('Please enter your verify code.')
    }

    setSubmitting(true)
    const isOk = await Auth$.confirmSignUp(username, code)
    setSubmitting(false)

    if (!isOk) {
      alert('Confirmed failed. Please check if you have input the right code.')
    }

    alert('You have confirmed your account.')
    setType(Type.Login)

    setUsername('')
    setPassword('')
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    switch (type) {
      case Type.Login:
        return onSignIn()
      case Type.Register:
        return onSignUp()
      case Type.ConfirmSingUp:
        return onConfirmed()
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={onSubmit}>
        {type !== Type.ConfirmSingUp && (
          <>
            <TextInput
              className="block w-full mb-4"
              type="username"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />

            <TextInput
              className="block w-full mb-4"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {type === Type.Register && (
              <TextInput
                className="block w-full"
                placeholder="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            )}
          </>
        )}

        {type === Type.ConfirmSingUp && (
          <>
            <h1 className="font-hairline mb-8 text-2xl">
              Code has sent to your mailbox.
            </h1>

            <TextInput
              className="block w-full"
              placeholder="Code"
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </>
        )}

        <Button
          type="submit"
          className="mt-10"
          primary
          block
          loading={isSubmitting}
          onClick={onSubmit}
        >
          {type === Type.ConfirmSingUp
            ? 'Confirmed'
            : type === Type.Login
            ? 'Sign in'
            : 'Sign up'}
        </Button>
      </form>

      <div className="text-right mt-8 text-gray-600">
        {type === Type.Login ? (
          <div>
            Haven't got an account?
            <Button onClick={() => setType(Type.Register)}>Sign Up</Button>
          </div>
        ) : (
          <div>
            Click here to
            <Button onClick={() => setType(Type.Login)}>Sign In</Button>
          </div>
        )}
      </div>
    </div>
  )
}
