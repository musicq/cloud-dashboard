import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {getProjectById} from '../../services/projects.service'
import {qs} from '../../shared/qs'

export function useProjectId() {
  const location = useLocation()
  const {search} = location

  return qs(search).projectId
}

export function useProject(id: string) {
  const [project, setProject] = useState(null)

  useEffect(() => {
    const sub = getProjectById(id).subscribe(res => setProject(res))

    return () => sub.unsubscribe()
  }, [id])

  return project
}
