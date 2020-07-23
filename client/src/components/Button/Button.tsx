import React, {MouseEventHandler} from 'react'
import {CProps} from '../../types'

interface ButtonProps {
  primary: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({primary, children, onClick}: CProps<ButtonProps>) => {
  const defaultCls = ['px-3', 'py-1', 'rounded']

  const featureCls = primary
    ? ['text-white', 'bg-blue-500', 'hover:bg-blue-800']
    : [
      'text-blue-500',
      'border-blue-500',
      'hover:border-blue-800',
      'hover:text-blue-800'
    ]

  const cls = [...defaultCls, ...featureCls]

  return (
    <button className={cls.join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}
