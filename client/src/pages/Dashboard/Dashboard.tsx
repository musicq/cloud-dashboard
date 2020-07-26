import React from 'react'
import {AppBar} from '../../components/AppBar'
import {useProject, useProjectId} from './Dashboard.service'

export const Dashboard = () => {
  const projectId = useProjectId()
  const project = useProject(projectId)

  return (
    <AppBar>
      <div>current projectID is : {projectId}</div>

      <pre>{JSON.stringify(project, null, 2)}</pre>
    </AppBar>
  )
}
