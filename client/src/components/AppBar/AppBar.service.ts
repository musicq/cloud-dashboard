import {useEffect, useState} from 'react'
import {Project, Projects$} from '../../services/projects.service'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    Projects$.fetchProjects()
  }, [])

  useEffect(() => {
    const sub = Projects$.get().subscribe(projects => setProjects(projects))

    return () => sub.unsubscribe()
  }, [])

  return projects
}
