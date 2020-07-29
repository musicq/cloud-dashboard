import {BehaviorSubject, Observable} from 'rxjs'
import {distinctUntilChanged, map, scan, shareReplay} from 'rxjs/operators'

export type ReducerFn<S> = (s: S) => S

type State = {[key: string]: any}
type MapFn = <T, R>(s: T) => R | undefined

export function createStore(initialState: State = {}) {
  const actions$ = new BehaviorSubject<ReducerFn<any>>(s => s)

  const state$ = actions$.pipe(
    scan((state, action) => action(state), initialState),
    shareReplay(1)
  )

  const createReducer = <S extends State>(fn: ReducerFn<S>) => {
    actions$.next(fn)
  }

  const selectCreator = (state$: Observable<State>) => <S>(
    predict: string | MapFn,
    defaultValue?: S
  ): Observable<S> => {
    // eslint-disable-next-line
    if (predict == undefined) {
      throw new Error("missing 'predict' parameter in select' method!")
    }

    let mapFn = predict as MapFn

    if (typeof predict === 'string') {
      // @ts-ignore
      mapFn = (state: State): S | undefined => {
        const attrs = predict.split('.')
        let p = state
        let attr

        while (p !== null && (attr = attrs.shift()) !== undefined) {
          p = p[attr]

          if (p === undefined) {
            return defaultValue
          }
        }

        return p as S
      }
    }

    // @ts-ignore
    return state$.pipe(map(mapFn), distinctUntilChanged())
  }

  const clear = (field?: string) => {
    createReducer(state => {
      const ns = {...state}

      if (field) {
        Reflect.deleteProperty(ns, field)
        return ns
      }

      return initialState
    })
  }

  return {
    state$,
    select: selectCreator(state$),
    createReducer,
    clear
  }
}
