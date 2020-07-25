import {of} from 'rxjs'
import {CONFIG} from '../config'
import {Err} from './go'

export function errorHandler$(e: any) {
  console.error(e)

  return of(new Err(e))
}

export function errorHandler(e: any) {
  console.error(e)

  return new Err(e)
}

export function genURL(
  path: string,
  env: string = CONFIG.env,
  base: string = CONFIG.baseURL
) {
  return new URL(`${env}/${path}`, base).href
}
