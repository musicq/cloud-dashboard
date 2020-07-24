import React, {useEffect, useState} from 'react'
import {Redirect, Route, RouteProps} from 'react-router-dom'
import {Observable, Subscription} from 'rxjs'
import {CProps} from '../../types'

interface GuardProps extends RouteProps {
  redirectTo?: string
  guard: () => boolean | Observable<boolean> | Promise<boolean>
}

export const Guard = ({
  redirectTo = '/login',
  guard,
  children,
  ...rest
}: CProps<GuardProps>) => {
  const [isRedirecting, setRedirectStatus] = useState(true)
  const [canAccess, setAccess] = useState(false)

  useEffect(() => {
    const res = guard()
    let sub: Subscription

    if (typeof res === 'boolean') {
      setAccess(res)
      setRedirectStatus(false)
    } else if (res instanceof Promise) {
      res
        .then(s => setAccess(s))
        .catch(e => setAccess(false))
        .finally(() => setRedirectStatus(false))
    } else {
      sub = res.subscribe(
        s => {
          setAccess(s)
        },
        () => setAccess(false),
        () => setRedirectStatus(false)
      )
    }

    return () => {
      if (sub) {
        sub.unsubscribe()
      }
    }
  }, [guard])

  if (isRedirecting) {
    return null
  }

  return (
    <Route
      {...rest}
      render={({location}) =>
        canAccess ? (
          children
        ) : (
          <Redirect to={{pathname: redirectTo, state: {from: location}}} />
        )
      }
    />
  )
}
