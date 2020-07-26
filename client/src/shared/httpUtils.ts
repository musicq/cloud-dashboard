import {of} from 'rxjs'
import {CONFIG} from '../config'
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
