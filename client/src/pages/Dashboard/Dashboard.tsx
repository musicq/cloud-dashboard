import React from 'react'
import {AppBar} from '../../components/AppBar'
import {Card} from '../../components/Card'
import {useProject, useProjectId} from './Dashboard.service'

export const Dashboard = () => {
  const projectId = useProjectId()
  const project = useProject(projectId)

  return (
    <AppBar>
      <div>current projectID is : {projectId}</div>

      <Card
        title="Introduce guide"
        footer={{link: 'https://google.com', title: 'Browse all lessons'}}
      >
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </Card>
    </AppBar>
  )
}
