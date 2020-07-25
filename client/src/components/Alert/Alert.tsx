import React from 'react'
import {CProps} from '../../types'

export const Alert = ({className = '', children}: CProps<any>) => {
  const cls = [
    'p-4 border border-red-300 bg-red-200 text-red-700 rounded',
    className
  ].join(' ')

  return <div className={cls}>{children}</div>
}
