import {useEffect, useState} from 'react'
import {Project, Projects$} from '../../services/projects.service'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const sub = Projects$.get().subscribe(projects => setProjects(projects))

    return () => sub.unsubscribe()
  }, [])

  return projects
}

export function useDefaultProjectId(id: string, projects: Project[]) {
  if (id) {
    return id
  }

  return projects[0]?.id
}
