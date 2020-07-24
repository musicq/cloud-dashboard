import {useEffect, useState} from 'react'
import {Auth$, UserInfo} from '../services/auth.service'

export function useCurrentUser() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserInfo>(null)

  useEffect(() => {
    const sub = Auth$.getUserInfo().subscribe(userInfo => {
      setUser(userInfo)
      setLoading(false)
    })

    return () => sub.unsubscribe()
  }, [])

  return {loading, user}
}
