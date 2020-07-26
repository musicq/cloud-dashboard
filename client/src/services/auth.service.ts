import {CognitoUserSession} from 'amazon-cognito-identity-js'
import {Auth} from 'aws-amplify'
import {from, of} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'
import {Err, go} from '../shared/go'
import {store} from '../store'

const Actions = {
  userInfo: 'userInfo',
  session: 'session'
}

interface IUserInfo {
  id?: string
  username: string
  attributes: {
    email?: string
  }
}

export type UserInfo = IUserInfo | null

function getUserInfo() {
  return store.select<UserInfo>(Actions.userInfo, null).pipe(
    switchMap(userInfo =>
      userInfo === null
        ? from(Auth.currentUserInfo()).pipe(
            tap(data => {
              if (data !== null) {
                setUserInfo(data)
              }
            })
          )
        : of(userInfo)
    )
  )
}

function setUserInfo(userInfo: UserInfo) {
  store.createReducer(state => ({
    ...state,
    [Actions.userInfo]: userInfo
  }))
}

function getSession() {
  return store.select<CognitoUserSession>(Actions.session).pipe(
    switchMap(session =>
      session
        ? of(session)
        : from(
            Auth.currentSession().then(session => {
              if (session) {
                setSession(session)
              }
              return session
            })
          )
    )
  )
}

function setSession(session: CognitoUserSession) {
  store.createReducer(state => ({
    ...state,
    [Actions.session]: session
  }))
}

async function signIn(username: string, password: string): Promise<UserInfo> {
  const res = await go(
    Auth.signIn({
      username,
      password
    })
  )

  if (res instanceof Err) {
    console.error('Login failed.\n', res.e)

    setUserInfo(null)

    return null
  }

  const userInfo = await Auth.currentUserInfo()
  const session = await Auth.currentSession()

  setUserInfo(userInfo)
  setSession(session)

  return userInfo
}

async function signOut(): Promise<boolean> {
  const res = await go(Auth.signOut())

  if (res instanceof Err) {
    console.error('Logout failed.\n', res.e)

    return false
  }

  setUserInfo(null)

  return true
}

async function signUp(
  username: string,
  password: string,
  email: string
): Promise<boolean> {
  const res = await go(
    Auth.signUp({
      username,
      password,
      attributes: {
        email: email
      }
    })
  )

  if (res instanceof Err) {
    console.error('Sign up failed.\n', res.e)

    return false
  }

  return true
}

async function confirmSignUp(username: string, code: string): Promise<boolean> {
  const res = await go(Auth.confirmSignUp(username, code))

  if (res instanceof Err) {
    console.error('Confirmed failed.\n', res.e)

    return false
  }

  return true
}

export const Auth$ = {
  getSession,
  getUserInfo,
  signIn,
  signUp,
  signOut,
  confirmSignUp
}
