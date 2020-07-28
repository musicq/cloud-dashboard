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
  edit?: boolean
  data?: any
  onChange: (data: any) => void
}
