import {useEffect, useState} from 'react'
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs'
import {
  catchError,
  filter,
  map,
  pluck,
  switchMap,
  take,
  tap,
} from 'rxjs/operators'
import {
  errorHandler,
  errorHandlerWithDefaultValue,
  request,
} from '../shared/http'
import {store} from '../store'
import {Auth$} from './auth.service'

export enum WidgetTypes {
  Resource,
  API,
  SQL,
  ProjectInfo,
  News,
  Status,
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
  updatedAt: number
  createdAt: number
  id: string
  projectName: string
  resources: WidgetsLayout
  username: string
}

const Actions = {
  Projects: 'Projects',
}

const username$ = Auth$.getUserInfo().pipe(pluck('username'))

export const Projects$ = {
  loading$: new BehaviorSubject(false),
  fetchProjects,
  get: getProjects,
  getById: getProjectById,
  setById,
  set: setProjects,
  create: createProject,
  updateById: updateProjectResourcesById,
}

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

function appendProject(project: Project) {
  store.createReducer(state => {
    const projects = state[Actions.Projects] || []
    const newProjects = [...projects, project]

    return {
      ...state,
      [Actions.Projects]: newProjects,
    }
  })
}

function fetchProjects() {
  Projects$.loading$.next(true)

  request(`projects`)
    .pipe(
      map(res => res.Items),
      tap(projects => {
        if (projects && projects.length > 0) {
          Projects$.set(projects)
        }
      }),
      catchError(errorHandlerWithDefaultValue([])),
      tap(() => Projects$.loading$.next(false))
    )
    .subscribe()
}

function getProjects(): Observable<Project[]> {
  return store.select<Project[]>(Actions.Projects, [])
}

function setProjects(projects: Project[]) {
  Projects$.get()
    .pipe(
      take(1),
      map(stateProjects => {
        if (!stateProjects || stateProjects.length === 0) {
          return projects
        }

        // merge
        return projects.map(project => {
          const stateProject = stateProjects.find(p => p.id === project.id)

          if (!stateProject) {
            return project
          }

          if (stateProject.updatedAt === project.updatedAt) {
            return project.resources ? project : stateProject
          }

          return stateProject.updatedAt > project.updatedAt
            ? stateProject
            : project
        })
      }),
      tap(projects =>
        store.createReducer(state => ({
          ...state,
          [Actions.Projects]: projects,
        }))
      )
    )
    .subscribe()
}

let loadingProjectById = false

function getProjectById(id?: string) {
  const defaultValue = {}

  return store.select(Actions.Projects, [] as Project[]).pipe(
    filter(() => Boolean(id) && !loadingProjectById),
    switchMap(projects => {
      const project = projects.find(project => project.id === id)

      if (project && project.resources) {
        return of(project)
      }

      Projects$.loading$.next(true)
      loadingProjectById = true

      return request(`projects/${id}`).pipe(
        map(res => res.Item),
        tap(project => {
          if (project) {
            Projects$.setById(id!, project)
          }
          Projects$.loading$.next(false)
          loadingProjectById = false
        }),
        catchError(errorHandlerWithDefaultValue(defaultValue))
      )
    })
  )
}

function setById(id: string, project: Project) {
  store.createReducer(state => {
    const projects: Project[] = state[Actions.Projects] || []

    let newProjects = []

    if (projects.length === 0) {
      newProjects.push(project)
    } else {
      newProjects = projects.map(p => {
        if (p.id === id) {
          return project
        }
        return p
      })
    }

    return {
      ...state,
      [Actions.Projects]: newProjects,
    }
  })
}

function updateProjectResourcesById(
  id: string | undefined,
  resources: WidgetsLayout
) {
  if (!id) {
    return EMPTY
  }

  return request(`projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(resources),
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
