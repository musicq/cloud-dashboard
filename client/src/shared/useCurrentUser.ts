import {Auth} from 'aws-amplify'
import {useEffect, useState} from 'react'

export function useCurrentUser() {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    Auth.currentUserInfo()
      .then(user => {
        setUser(user)
      })
      .catch(e => {
        console.error('Get userinfo failed:', e)
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  return {loading, user}
}
