import {Auth} from 'aws-amplify'
import {useEffect, useState} from 'react'

export function useCurrentUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    Auth.currentUserInfo()
      .then(user => {
        setUser(user)
      })
      .catch(e => {
        console.error('Get userinfo failed:', e)
        setUser(null)
      })
  }, [])

  return user
}
