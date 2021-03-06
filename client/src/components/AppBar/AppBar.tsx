import React, {ChangeEvent} from 'react'
import {MdAddCircle} from 'react-icons/md'
import {useHistory, useRouteMatch} from 'react-router-dom'
import {useCurrentUser} from '../../shared/useCurrentUser'
import {useProjectId} from '../../shared/useProjectId'
import {CProps} from '../../types'
import {Avatar} from '../Avatar'
import {Button} from '../Button'
import {Logo} from '../Logo'
import {useProjects} from './AppBar.service'

interface AppBarProps {}

export const AppBar = ({children}: CProps<AppBarProps>) => {
  const projects = useProjects()
  const projectId = useProjectId()
  const {user} = useCurrentUser()
  const history = useHistory()
  const match = useRouteMatch()

  const isLoggedIn = user !== null
  const isNewProjectPath = match.path === '/new-project'

  const onCreateProject = () => history.push('/new-project')

  const selectedProjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (!e.target.value) {
      return
    }

    history.push('/dashboard?projectId=' + e.target.value)
  }

  return (
    <div>
      <div className="py-1 px-4 shadow bg-blue-500 flex justify-between items-center fixed top-0 w-full">
        <div className="flex items-center">
          <Logo reverse />

          {isLoggedIn && projects.length > 0 && (
            <select
              className="ml-6 bg-blue-500 border h-8 px-2 rounded text-white w-48"
              value={projectId}
              onChange={selectedProjectChange}
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.projectName}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
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

              <Avatar user={user} />
            </div>
          )}
        </div>
      </div>

      <div className="overflow-y-auto" style={style.body}>
        {children}
      </div>
    </div>
  )
}

const style = {
  body: {
    height: 'calc(100vh - 53px)',
    marginTop: 53,
  },
}
