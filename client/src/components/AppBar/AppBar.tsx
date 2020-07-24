import React from 'react'
import {useCurrentUser} from '../../shared/useCurrentUser'
import {CProps} from '../../types'
import {Avatar} from '../Avatar'
import {Logo} from '../Logo'

interface AppBarProps {}

export const AppBar = ({children}: CProps<AppBarProps>) => {
  const {user} = useCurrentUser()

  return (
    <div>
      <div className="py-1 px-4 shadow bg-blue-500 flex justify-between items-center">
        <Logo reverse />

        {user && <Avatar user={user} />}
      </div>

      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}
