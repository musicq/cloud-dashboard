import React from 'react'
import {useCurrentUser} from '../../shared/useCurrentUser'
import {CProps} from '../../types'

interface AppBarProps {
}

export const AppBar = ({children}: CProps<AppBarProps>) => {
  const {user} = useCurrentUser()

  return (
    <div>
      <div className="py-1 px-4 shadow bg-blue-500 flex justify-between items-center">
        <h1 className="text-3xl text-white">Cloud dashboard</h1>

        {user && (
          <div>
            {(user as any).username}
          </div>
        )}
      </div>

      <div className="overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
