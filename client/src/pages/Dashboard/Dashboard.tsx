import React from 'react'
import {useLocation} from 'react-router-dom'
import {AppBar} from '../../components/AppBar'
import {qs} from '../../shared/qs'

function useProjectId() {
  const location = useLocation()
  const {search} = location

  return qs(search).projectId
}

export const Dashboard = () => {
  const projectId = useProjectId()

  return (
    <AppBar>
      <div>current projectID is : {projectId}</div>
    </AppBar>
  )
}
