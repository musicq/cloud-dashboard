import {CSSProperties, PropsWithChildren} from 'react'

export type CProps<P> = Readonly<
  PropsWithChildren<P> &
    Partial<{
      className: string
      style: CSSProperties
    }>
>

export type Pos = [number, number]

export interface WidgetProps {
  id: string
  edit?: boolean
  data?: any
  onChange: ({id, data}: {id: string; data: any}) => void
}
