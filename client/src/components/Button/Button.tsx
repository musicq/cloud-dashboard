import React, {ButtonHTMLAttributes, MouseEventHandler} from 'react'
import {noop} from '../../shared/noop'
import {CProps} from '../../types'
import {Spinner} from '../Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
  block?: boolean
  loading?: boolean
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
}

export const Button = ({
  primary = false,
  block = false,
  className = '',
  loading = false,
  disabled = false,
  onClick = noop,
  children,
  ...rest
}: CProps<ButtonProps>) => {
  const defaultCls = [
    'px-3',
    'py-2',
    'rounded',
    'transition-colors',
    'duration-300',
    'ease-in-out',
    'focus:outline-none'
  ]

  if (block) {
    defaultCls.push('w-full')
  }

  const isDisabled = disabled || loading

  const featureCls = primary
    ? [
        'text-white',
        isDisabled ? 'bg-gray-400' : 'bg-blue-500',
        isDisabled ? '' : 'hover:bg-blue-800'
      ]
    : [
        isDisabled ? 'text-gray-400' : 'text-blue-500',
        isDisabled ? 'border-gray-400' : 'border-blue-500',
        isDisabled ? '' : 'hover:border-blue-800',
        isDisabled ? '' : 'hover:text-blue-800'
      ]

  if (disabled || loading) {
    featureCls.push('cursor-not-allowed')
  }

  const cls = [...defaultCls, ...featureCls, className].join(' ')

  return (
    <button className={cls} disabled={isDisabled} onClick={onClick} {...rest}>
      <div className={loading ? 'flex items-center justify-center' : ''}>
        <span className="flex mr-2">{loading && <Spinner />}</span>
        {children}
      </div>
    </button>
  )
}
