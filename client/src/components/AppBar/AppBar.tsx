import React from 'react'
import {useCurrentUser} from '../../shared/useCurrentUser'
import {MdAddCircle} from 'react-icons/md'
import {CProps} from '../../types'
import {Avatar} from '../Avatar'
import {Button} from '../Button'
import {Logo} from '../Logo'

interface AppBarProps {}

export const AppBar = ({children}: CProps<AppBarProps>) => {
  const {user} = useCurrentUser()

  const onCreateProject = () => console.log('create project')

  const isLoggedIn = user !== null

  return (
    <div>
      <div className="py-1 px-4 shadow bg-blue-500 flex justify-between items-center">
        <Logo reverse />

        {isLoggedIn && (
          <div className="flex items-center">
            <Button
              primary
              className="mr-8 text-white"
              onClick={onCreateProject}
            >
              <div className="flex items-center">
                <MdAddCircle className="mr-1" />
                New project
              </div>
            </Button>

            {user && <Avatar user={user} />}
          </div>
        )}
      </div>

      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}
