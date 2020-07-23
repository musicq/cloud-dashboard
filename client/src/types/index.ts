import {CSSProperties, PropsWithChildren} from 'react'

export type CProps<P> = PropsWithChildren<P> &
  Partial<{
    className: string,
    style: CSSProperties
  }>
