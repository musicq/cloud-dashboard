import {CSSProperties, PropsWithChildren} from 'react'

export type CProps<P> = Readonly<
  PropsWithChildren<P> &
    Partial<{
      className: string
      style: CSSProperties
    }>
>

export type Pos = [number, number]
