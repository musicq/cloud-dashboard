import {from} from 'rxjs'
import {catchError, map, switchMap, take} from 'rxjs/operators'
import {errorHandler$, genURL} from '../shared/httpUtils'
import {Auth$} from './auth.service'

export function createProject(projectName: string) {
  return Auth$.getUserInfo().pipe(
    take(1),
    map(userInfo => JSON.stringify({username: userInfo.username, projectName})),
    map(
      body =>
        ({
          method: 'POST',
          mode: 'cors',
          body
        } as RequestInit)
    ),
    switchMap(opts =>
      from(fetch(genURL('projects'), opts).then(res => res.json()))
    ),
    catchError(errorHandler$)
  )
}
