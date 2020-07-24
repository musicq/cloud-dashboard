import React from 'react'
import {MdCloud} from 'react-icons/md'
import {useCurrentUser} from '../../shared/useCurrentUser'
import {CProps} from '../../types'
import {Avatar} from '../Avatar'

interface AppBarProps {}

export const AppBar = ({children}: CProps<AppBarProps>) => {
  const {user} = useCurrentUser()

  return (
    <div>
      <div className="py-1 px-4 shadow bg-blue-500 flex justify-between items-center">
        <h1 className="flex items-center text-3xl text-white">
          <MdCloud className="mr-2" />
          Cloud dashboard
        </h1>

        {user && <Avatar user={user} />}
      </div>

      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}
