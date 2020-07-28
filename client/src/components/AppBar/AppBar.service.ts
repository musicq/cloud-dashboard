import {useEffect, useState} from 'react'
import {getProjects, Project} from '../../services/projects.service'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const sub = getProjects().subscribe(projects => setProjects(projects))

    return () => sub.unsubscribe()
  }, [])

  return projects
}
