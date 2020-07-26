import {from} from 'rxjs'
import {catchError, map, pluck, switchMap, take} from 'rxjs/operators'
import {
  errorHandler,
  errorHandlerWithDefaultValue,
  genURL
} from '../shared/httpUtils'
import {Auth$} from './auth.service'

const username$ = Auth$.getUserInfo().pipe(pluck('username'))

export function createProject(projectName: string) {
  return username$.pipe(
    take(1),
    map(username => JSON.stringify({username, projectName})),
    map(
      body =>
        ({
          method: 'POST',
          body,
          headers: {
            'Content-Type': 'application/json'
          }
        } as RequestInit)
    ),
    switchMap(opts =>
      from(fetch(genURL('projects'), opts).then(res => res.json()))
    ),
    catchError(errorHandler)
  )
}

export function getProjectById(id: string) {
  return from(fetch(genURL(`projects/${id}`)).then(res => res.json())).pipe(
    catchError(errorHandlerWithDefaultValue({}))
  )
}
