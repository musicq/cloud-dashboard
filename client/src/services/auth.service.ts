import {Auth} from 'aws-amplify'
import {from, of} from 'rxjs'
import {switchMap, tap} from 'rxjs/operators'
import {Err, go} from '../shared/go'
import {store} from '../store'

const Actions = {
  userInfo: 'userInfo'
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

async function signIn(username: string, password: string) {
  const res = await go(
    Auth.signIn({
      username,
      password
    })
  )

  if (res instanceof Err) {
    console.error('Login failed.\n', res.e)

    return setUserInfo(null)
  }

  const userInfo = await go(Auth.currentUserInfo())

  setUserInfo(userInfo)
}

async function signOut() {
  const res = await go(Auth.signOut())

  if (res instanceof Err) {
    return console.error('Logout failed.\n', res.e)
  }

  setUserInfo(null)
}

function signUp(username: string, password: string, email: string) {
  return Auth.signUp({
    username,
    password,
    attributes: {
      email: email
    }
  })
}

function confirmSignUp(username: string, code: string) {
  return Auth.confirmSignUp(username, code)
}

export const Auth$ = {
  getUserInfo,
  setUserInfo,
  signIn,
  signUp,
  signOut,
  confirmSignUp
}
