import React, {InputHTMLAttributes} from 'react'

interface TextInputProps<T> extends InputHTMLAttributes<T> {}

export const TextInput = ({className = '', ...props}: TextInputProps<any>) => {
  const cls = [
    'h-12 py-3 border-b text-gray-600 border-blue-500 outline-none focus:border-blue-800 transition-colors duration-300 ease-in-out',
    className
  ].join(' ')

  return <input className={cls} {...props} />
}
