import {EMPTY} from 'rxjs'
import {catchError, map, pluck, switchMap, take} from 'rxjs/operators'
import {
  errorHandler,
  errorHandlerWithDefaultValue,
  request
} from '../shared/http'
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

const username$ = Auth$.getUserInfo().pipe(pluck('username'))

export function createProject(projectName: string) {
  return username$.pipe(
    take(1),
    map(username => JSON.stringify({username, projectName})),
    map(body => ({method: 'POST', body} as RequestInit)),
    switchMap(opts => request('projects', opts)),
    catchError(errorHandler)
  )
}

export function getProjects() {
  return request(`projects`).pipe(
    map(res => res.Items),
    catchError(errorHandlerWithDefaultValue([]))
  )
}

export function getProjectById(id: string) {
  if (!id) {
    return EMPTY
  }

  return request(`projects/${id}`).pipe(
    map(res => res.Item),
    catchError(errorHandlerWithDefaultValue({}))
  )
}
