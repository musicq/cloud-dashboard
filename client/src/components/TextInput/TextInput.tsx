import React, {InputHTMLAttributes} from 'react'

interface TextInputProps<T> extends InputHTMLAttributes<T> {
  label?: string
}

export const TextInput = ({
  label,
  className = '',
  ...props
}: TextInputProps<any>) => {
  const cls = [
    'block w-full h-12 py-3 border-b text-gray-600 border-blue-500 outline-none focus:border-blue-800 transition-colors duration-300 ease-in-out',
    className
  ].join(' ')

  return (
    <div>
      {label && <label className="text-blue-500 block">{label}</label>}

      <input className={cls} {...props} />
    </div>
  )
}
