import React from 'react'
import {useHistory, useRouteMatch} from 'react-router-dom'
import {noop} from '../../shared/noop'
import {useCurrentUser} from '../../shared/useCurrentUser'
import {MdAddCircle} from 'react-icons/md'
import {CProps} from '../../types'
import {Avatar} from '../Avatar'
import {Button} from '../Button'
import {Logo} from '../Logo'
import {useProjects} from './AppBar.service'

interface AppBarProps {
  projectId?: string
  onProjectChange?: (projectId: string) => void
}

export const AppBar = ({
  projectId,
  onProjectChange = noop,
  children
}: CProps<AppBarProps>) => {
  const {user} = useCurrentUser()
  const history = useHistory()
  const match = useRouteMatch()
  const projects = useProjects()

  const isNewProjectPath = match.path === '/new-project'

  const onCreateProject = () => history.push('/new-project')

  const isLoggedIn = user !== null

  return (
    <div>
      <div className="py-1 px-4 shadow bg-blue-500 flex justify-between items-center">
        <div className="flex items-center">
          <Logo reverse />

          {projects.length > 0 && (
            <div className="ml-6">
              <select
                className="bg-blue-500 border h-8 px-2 rounded text-white w-48"
                value={projectId}
                onChange={e => onProjectChange(e.target.value)}
              >
                {projects.map(project => (
                  <option value={project.id}>{project.projectName}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {isLoggedIn && (
          <div className="flex items-center">
            {!isNewProjectPath && (
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
            )}

            {user && <Avatar user={user} />}
          </div>
        )}
      </div>

      <div className="overflow-y-auto">{children}</div>
    </div>
  )
}
