import {catchError, map, pluck, switchMap, take} from 'rxjs/operators'
import {
  errorHandler,
  errorHandlerWithDefaultValue,
  request
} from '../shared/http'
import {Auth$} from './auth.service'

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

export function getProjectById(id: string) {
  return request(`projects/${id}`).pipe(
    catchError(errorHandlerWithDefaultValue({}))
  )
}
