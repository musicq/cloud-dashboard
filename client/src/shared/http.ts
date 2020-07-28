import {from, Observable, of, throwError} from 'rxjs'
import {map, switchMap, take} from 'rxjs/operators'
import {CONFIG} from '../config'
import {Auth$} from '../services/auth.service'
import {Err} from './go'

export function errorHandler(e: any) {
  console.error(e)

  return of(e instanceof Err ? e : new Err(e))
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
    map(session => session.getIdToken().getJwtToken()),
    take(1)
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
    switchMap(opt => from(fetch(genURL(path), opt))),
    switchMap(res => {
      if (res.status >= 400) {
        return from(res.json()).pipe(switchMap(e => throwError(new Err(e))))
      }

      return from(res.json())
    })
  )
}
