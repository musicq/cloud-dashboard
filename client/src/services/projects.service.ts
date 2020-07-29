import {useEffect, useState} from 'react'
import {BehaviorSubject, EMPTY, of} from 'rxjs'
import {catchError, map, pluck, switchMap, take, tap} from 'rxjs/operators'
import {
  errorHandler,
  errorHandlerWithDefaultValue,
  request
} from '../shared/http'
import {store} from '../store'
import {Auth$} from './auth.service'

export enum WidgetTypes {
  Resource,
  API,
  SQL,
  ProjectInfo,
  News,
  Status
}

export interface WidgetConfig {
  link?: string
  name?: string
}

export interface Widget {
  id: string
  type: WidgetTypes
  title: string
  config?: WidgetConfig
  data: {[key: string]: any}
}

export type WidgetsLayout = Array<Widget[]>

export interface Project {
  createdAt: string
  id: string
  projectName: string
  resources: WidgetsLayout
  username: string
}

const Actions = {
  Projects: 'Projects'
}

const username$ = Auth$.getUserInfo().pipe(pluck('username'))

function createProject(projectName: string) {
  return username$.pipe(
    take(1),
    map(username => JSON.stringify({username, projectName})),
    map(body => ({method: 'POST', body} as RequestInit)),
    switchMap(opts => request('projects', opts)),
    tap(project => appendProject(project)),
    catchError(errorHandler)
  )
}

export const Projects$ = {
  loading$: new BehaviorSubject(false),
  get: getProjects,
  getById: getProjectById,
  setById,
  set: setProjects,
  create: createProject,
  updateById: updateProjectResourcesById
}

function appendProject(project: Project) {
  store.createReducer(state => {
    const projects = state[Actions.Projects] || []
    const newProjects = [...projects, project]

    return {
      ...state,
      [Actions.Projects]: newProjects
    }
  })
}

function getProjects() {
  Projects$.loading$.next(true)
  return store.select(Actions.Projects, []).pipe(
    switchMap(projects =>
      projects.length > 0
        ? of(projects)
        : request(`projects`).pipe(
            map(res => res.Items),
            tap(projects => {
              if (projects && projects.length > 0) {
                Projects$.set(projects)
              }
            }),
            catchError(errorHandlerWithDefaultValue([]))
          )
    ),
    tap(() => Projects$.loading$.next(false))
  )
}

function setProjects(projects: Project[]) {
  store.createReducer(state => ({
    ...state,
    [Actions.Projects]: projects
  }))
}

function getProjectById(id: string) {
  if (!id) {
    return EMPTY
  }

  const defaultValue = {}

  return store.select(Actions.Projects, [] as Project[]).pipe(
    switchMap(projects => {
      const project = projects.find(project => project.id === id)

      if (projects.length > 0 && project && project.resources) {
        return of(project)
      }

      Projects$.loading$.next(true)
      return request(`projects/${id}`).pipe(
        map(res => res.Item),
        tap(project => {
          if (project) {
            Projects$.setById(id, project)
          }
          Projects$.loading$.next(false)
        }),
        catchError(errorHandlerWithDefaultValue(defaultValue))
      )
    })
  )
}

function setById(id: string, project: Project) {
  store.createReducer(state => {
    const projects: Project[] = state[Actions.Projects] || []
    const newProjects = projects.map(p => {
      if (p.id === id) {
        return project
      }
      return p
    })

    return {
      ...state,
      [Actions.Projects]: newProjects
    }
  })
}

function updateProjectResourcesById(id: string, resources: WidgetsLayout) {
  if (!id) {
    return EMPTY
  }

  return request(`projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(resources)
  }).pipe(
    tap(res => {
      Projects$.getById(id)
        .pipe(
          take(1),
          map(project => ({...project, resources})),
          tap(project => Projects$.setById(id, project))
        )
        .subscribe()
    }),
    catchError(errorHandler)
  )
}

export function useLoadingProjects() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const sub = Projects$.loading$.subscribe(loading => setLoading(loading))

    return () => sub.unsubscribe()
  }, [])

  return loading
}
