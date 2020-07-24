import React, {SyntheticEvent, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Auth$} from '../../services/auth.service'
import {Button} from '../Button'
import {TextInput} from '../TextInput'

enum Type {
  Login,
  Register
}

export const LoginForm = () => {
  const [type, setType] = useState(Type.Login)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const history = useHistory()

  const onSwitchType = () =>
    setType(type === Type.Register ? Type.Login : Type.Register)

  const onSignIn = async () => {
    if (!username || !password) {
      return alert('You haven\'t finished all the fields.')
    }

    setSubmitting(true)
    const userInfo = await Auth$.signIn(username, password)
    setSubmitting(false)

    if (userInfo) {
      history.push('/')
    }
  }

  const onSignUp = () => {
    if (!username || !password || !email) {
      return alert('You haven\'t finished all the fields.')
    }

    setSubmitting(true)
    Auth$.signUp(username, password, email)
    setSubmitting(false)
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    switch (type) {
      case Type.Login:
        return onSignIn()
      case Type.Register:
        return onSignUp()
    }
  }

  return (
    <div className="p-4">
      <form onSubmit={onSubmit}>
        <TextInput
          className="block w-full mb-4"
          type="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <TextInput
          className="block w-full"
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

        <Button
          type="submit"
          className="block w-full mt-10"
          primary
          block
          loading={isSubmitting}
          onClick={onSubmit}
        >
          {type === Type.Login ? 'Sign in' : 'Sign up'}
        </Button>
      </form>

      <div className="text-right mt-8 text-gray-600">
        {type === Type.Login ? (
          <div>
            Haven't got an account?
            <Button onClick={onSwitchType}>Sign Up</Button>
          </div>
        ) : (
          <div>
            Click here to
            <Button onClick={onSwitchType}>Sign In</Button>
          </div>
        )}
      </div>
    </div>
  )
}
