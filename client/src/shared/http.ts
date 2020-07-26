import {from, Observable, of} from 'rxjs'
import {map, switchMap} from 'rxjs/operators'
import {CONFIG} from '../config'
import {Auth$} from '../services/auth.service'
import {Err} from './go'

export function errorHandler(e: any) {
  console.error(e)

  return of(new Err(e))
}

export function errorHandlerWithDefaultValue(defaultValue: any) {
  return (e: any) => {
    console.error(e)

    return of(defaultValue)
  }
}

export function genURL(
  path: string,
  env: string = CONFIG.apiGateway.ENV,
  base: string = CONFIG.apiGateway.URL
) {
  return new URL(`${env}/${path}`, base).href
}

export function request(path: string, opt: RequestInit = {}) {
  const token$ = Auth$.getSession().pipe(
    map(session => session.getIdToken().getJwtToken())
  )

  const opt$: Observable<RequestInit> = token$.pipe(
    map(token => {
      const {headers, ...restOpts} = opt

      const headersWithToken = new Headers(headers)
      headersWithToken.append('Authorization', token)

      return {
        url: genURL(path),
        headers: {Authorization: token},
        ...restOpts
      }
    })
  )

  return opt$.pipe(
    switchMap(opt => from(fetch(genURL(path), opt).then(res => res.json())))
  )
}
