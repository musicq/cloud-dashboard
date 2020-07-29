import {useEffect} from 'react'
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom'
import {Project} from '../services/projects.service'
import {qs} from './qs'

export function useProjectId(projects: Project[] = []) {
  const history = useHistory()
  const location = useLocation()
  const match = useRouteMatch()
  const {search} = location
  const projectId = qs(search).projectId
  const defaultId = projects[0]?.id || ''

  useEffect(() => {
    if (
      (match.path === '/dashboard' && !projectId) ||
      projectId === 'undefined'
    ) {
      const defaultId = projects[0]?.id

      if (defaultId) {
        history.push('/dashboard?projectId=' + defaultId)
      }
    }
  }, [projectId, projects])

  return projectId || defaultId
}
